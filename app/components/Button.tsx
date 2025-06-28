import cn from 'classnames';
import React from 'react';
import type { JSX, Ref } from 'react';
import { type MouseEventHandler, type FocusEventHandler, type ReactNode, forwardRef } from 'react';

type CommonProps<T> = {
  disabled?: boolean;
  variant?: 'secondary' | 'transparent' | 'outline';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  withAnimatedBorders?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<T>;
  onFocus?: FocusEventHandler<Element>;
  onBlur?: FocusEventHandler<Element>;
};

type ButtonProps = CommonProps<HTMLButtonElement> & React.ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { variant = 'secondary', size = 'm', className, withAnimatedBorders, ...props },
    ref
  ): JSX.Element => {
    const commonProps: ButtonProps = {
      ...props,
      className: cn(
        {
          'bg-green-600': variant === 'secondary',
          'transition-colors hover:bg-green-700': !props.disabled && variant !== 'transparent',
          'text-white': variant === 'secondary' && !props.disabled,
          'hover:text-white': variant === 'outline' && !props.disabled,
          'text-gray-300': variant === 'secondary' && props.disabled,
          'bg-transparent hover:bg-transparent': variant === 'transparent',
          'border border-gray-800 hover:bg-gray-100': variant === 'outline',
        },
        {
          'py-1 px-2 gap-1 text-xs leading-4': size === 'xs',
          'py-1 px-3 gap-2 text-sm leading-5': size === 's',
          'py-1.5 px-3 gap-2 text-sm leading-5': size === 'm',
          'py-1.5 px-3 gap-2 text-base leading-6': size === 'l',
          'py-2 px-3 gap-2 text-base leading-6': size === 'xl',
        },
        'inline-flex items-center justify-center',
        'rounded-lg font-medium select-none outline-none focus-visible:ring-2',
        props.disabled ? 'ring-gray-300 cursor-default' : 'ring-green-500 cursor-pointer',
        withAnimatedBorders && 'glowing-orders !rounded-[26px]',
        className
      ),
    };

    return <button {...commonProps} ref={ref as Ref<HTMLButtonElement>} />;
  }
);

Button.displayName = Button.name;
