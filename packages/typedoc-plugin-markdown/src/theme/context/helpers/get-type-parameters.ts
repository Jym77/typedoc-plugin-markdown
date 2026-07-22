import { backTicks, italic } from '@plugin/libs/markdown/index.js';
import { MarkdownThemeContext } from '@plugin/theme/index.js';
import { TypeParameterReflection } from 'typedoc';

export function getTypeParameters(
  this: MarkdownThemeContext,
  typeParameters?: TypeParameterReflection[],
): string | undefined {
  const expandParameters = this.options.getValue('expandParameters');

  return typeParameters
    ?.map((typeParameter) => {
      const nameDescription = [backTicks(typeParameter.name)];

      if (expandParameters) {
        if (typeParameter.type) {
          nameDescription.push(
            `${italic('extends')} ${this.partials.someType(typeParameter.type)}`,
          );
        }
        if (typeParameter.default) {
          nameDescription.push(
            `= ${this.partials.someType(typeParameter.default, { forceCollapse: true })}`,
          );
        }
      }

      return nameDescription.join(' ');
    })
    .join(', ');
}
