import { AnyObject, ClassNameCallback, HostClassName } from '../Types';
import { excludeFromArray, splitBySpace } from '../Utils';

/** @internal */
export function defineHostClassName<State extends AnyObject>(selector: HostClassName<State>): (string | ClassNameCallback<State>)[] {
  if (selector === null || selector === undefined || selector === false) {
    return [];
  } else if (typeof selector === 'function') {
    return [selector];
  } else if (typeof selector === 'string') {
    return splitBySpace(selector);
  } else if (Array.isArray(selector)) {
    return excludeFromArray(null, selector.map(value => {
      if (value === null || value === undefined || value === false) {
        return null;
      } else if (typeof value === 'string') {
        return splitBySpace(value);
      } else if (typeof value === 'function') {
        return value;
      } else {
        throw new Error(`Unexpected type of host key class name list item: ${typeof value}`);
      }
    }).flat(1));
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exhaustiveCheck: never = selector;
    throw new Error(`Unexpected type of host key class name: ${typeof selector}`);
  }
}
