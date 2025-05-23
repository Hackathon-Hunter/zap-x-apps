import React from 'react';

import { Text } from 'react-native';

import { ThemedText, ThemedTextProps } from './ThemedText';

/**
 * A specialized version of ThemedText that automatically applies
 * GeistMono font for numbers, while using Geist for text.
 */
export function NumberText({ children, ...props }: ThemedTextProps) {
  if (typeof children === 'string' && /^\d+([.,]\d+)?$/.test(children)) {
    return (
      <ThemedText {...props} type="mono">
        {children}
      </ThemedText>
    );
  }

  if (typeof children === 'string') {
    const parts = children.split(/(\d+([.,]\d+)?)/g).filter(Boolean);

    return (
      <Text style={props.style}>
        {parts.map((part, index) => {
          if (/^\d+([.,]\d+)?$/.test(part)) {
            return (
              <ThemedText key={index} {...props} type="mono">
                {part}
              </ThemedText>
            );
          }

          return (
            <ThemedText key={index} {...props}>
              {part}
            </ThemedText>
          );
        })}
      </Text>
    );
  }

  return <ThemedText {...props}>{children}</ThemedText>;
}
