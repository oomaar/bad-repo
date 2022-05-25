import React, { ReactNode } from "react";

/**
 * To get warning of keys warning.
 *
 * Could extract into a function in util/
 *
 * Thanks to: https://github.com/facebook/react/issues/12776#issuecomment-388446567
 */
export default function fragment(
  children: Array<ReactNode>,
  props?: React.Attributes
): React.ReactElement<{}> {
  return React.createElement(React.Fragment, props, ...children);
}
