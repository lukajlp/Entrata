import clsx from 'clsx';
import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native';

type ButtonProps = {
  title?: string;
  isLoading?: boolean;
  backgroundColor: string;
  textColor?: string;
  size: string;
  borderRadius: string;
  font?: string;
} & PressableProps;

export const Button = ({
  title,
  isLoading = false,
  backgroundColor,
  textColor,
  size,
  borderRadius,
  font,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      disabled={isLoading}
      style={{ backgroundColor }}
      className={clsx(styles.button, size, borderRadius)}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        title && <Text className={clsx(styles.buttonText, font)}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = {
  button: 'items-center justify-center',
  buttonText: 'text-white text-center',
};
