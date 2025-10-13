import { StringInputProps, set, unset, setIfMissing, PatchEvent } from 'sanity';
import { Stack, Text, TextInput } from '@sanity/ui';
import { useCallback } from 'react';

export function WatchTimeInput(props: StringInputProps) {
  const { onChange, value = '' } = props;

  // Calculate total hours from the display format
  const calculateHours = useCallback((displayValue: string): number => {
    if (!displayValue) return 0;

    // Try short format first: "X:Y:Z" (Days:Hours:Minutes)
    const shortMatch = displayValue.match(/^(\d+):(\d+):(\d+)$/);
    if (shortMatch) {
      const days = parseInt(shortMatch[1]) || 0;
      const hours = parseInt(shortMatch[2]) || 0;
      const minutes = parseInt(shortMatch[3]) || 0;
      return days * 24 + hours + minutes / 60;
    }

    // Try long format: "X Days, Y Hours, Z Minutes"
    const longMatch = displayValue.match(/(\d+)\s*Days?,\s*(\d+)\s*Hours?,\s*(\d+)\s*Minutes?/i);
    if (longMatch) {
      const days = parseInt(longMatch[1]) || 0;
      const hours = parseInt(longMatch[2]) || 0;
      const minutes = parseInt(longMatch[3]) || 0;
      return days * 24 + hours + minutes / 60;
    }

    return 0;
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;

      // Create patches array
      const patches = [];

      // Patch for the current watchtime field
      if (newValue) {
        patches.push(set(newValue));
      } else {
        patches.push(unset());
      }

      // Calculate and add patches for watchTimeHours field
      if (newValue) {
        const calculatedHours = calculateHours(newValue);
        if (calculatedHours > 0) {
          // Ensure the field exists first, then set the value
          patches.push(setIfMissing(0, ['watchTimeHours']));
          patches.push(set(calculatedHours, ['watchTimeHours']));
        }
      } else {
        // If watchtime is cleared, also clear watchTimeHours
        patches.push(unset(['watchTimeHours']));
      }

      // Emit all patches together
      onChange(PatchEvent.from(patches));
    },
    [onChange, calculateHours]
  );

  const calculatedHours = calculateHours(value);
  const isShortFormat = /^\d+:\d+:\d+$/.test(value);
  const isLongFormat = /^\d+\s*Days?,\s*\d+\s*Hours?,\s*\d+\s*Minutes?$/i.test(value);
  const isValidFormat = isShortFormat || isLongFormat;

  return (
    <Stack space={2}>
      <TextInput
        {...props}
        onChange={handleChange}
        value={value}
        placeholder="3:5:40 or 3 Days, 5 Hours, 40 Minutes"
      />
      {value && (
        <Text size={1} muted>
          {isValidFormat && calculatedHours > 0 ? (
            <span style={{ color: '#43d675' }}>
              ✓ Total: {calculatedHours.toFixed(2)} hours
            </span>
          ) : (
            <span style={{ color: '#f03e2f' }}>
              ⚠ Invalid format. Use: "X:Y:Z" or "X Days, Y Hours, Z Minutes"
            </span>
          )}
        </Text>
      )}
      <Text size={1} muted>
        Short format: "3:5:40" (3 Days, 5 Hours, 40 Minutes) or Long format: "3 Days, 5 Hours, 40 Minutes"
      </Text>
    </Stack>
  );
}
