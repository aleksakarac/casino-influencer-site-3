import { StringInputProps, set, unset, setIfMissing, PatchEvent, useFormValue } from 'sanity';
import { Stack, Text, TextInput } from '@sanity/ui';
import { useCallback, useEffect, useRef } from 'react';

export function WatchTimeInput(props: StringInputProps) {
  const { onChange, value = '', path } = props;
  const documentValue = useFormValue([]) as Record<string, unknown>;
  const isUpdatingRef = useRef(false);

  // Calculate total hours from the display format
  const calculateHours = useCallback((displayValue: unknown): number => {
    // Only process if displayValue is a string
    if (typeof displayValue !== 'string' || !displayValue) return 0;

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

      // Only update the current watchtime field
      onChange(newValue ? set(newValue) : unset());
    },
    [onChange]
  );

  // Update the watchTimeHours field when watchtime changes
  useEffect(() => {
    // Prevent infinite loops
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }

    if (typeof value === 'string' && value) {
      const calculatedHours = calculateHours(value);
      const currentHours = documentValue?.watchTimeHours as number | undefined;

      // Only update if the calculated hours differ from current value
      if (calculatedHours > 0 && calculatedHours !== currentHours) {
        isUpdatingRef.current = true;
        onChange(
          PatchEvent.from([
            setIfMissing(0, ['watchTimeHours']),
            set(calculatedHours, ['watchTimeHours'])
          ])
        );
      }
    } else if (!value && documentValue?.watchTimeHours !== undefined) {
      // Clear watchTimeHours when watchtime is empty
      isUpdatingRef.current = true;
      onChange(unset(['watchTimeHours']));
    }
  }, [value, calculateHours, onChange, documentValue]);

  const calculatedHours = calculateHours(value);
  // Safely convert value to string only for validation checks
  const valueStr = typeof value === 'string' ? value : '';
  const isShortFormat = /^\d+:\d+:\d+$/.test(valueStr);
  const isLongFormat = /^\d+\s*Days?,\s*\d+\s*Hours?,\s*\d+\s*Minutes?$/i.test(valueStr);
  const isValidFormat = isShortFormat || isLongFormat;

  return (
    <Stack space={2}>
      <TextInput
        {...props}
        onChange={handleChange}
        value={value}
        placeholder="3:5:40 or 3 Days, 5 Hours, 40 Minutes"
      />
      {valueStr && (
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
