# Dual Storybook Configuration

This project is configured with two separate Storybook instances:

1. **MDX Documentation Storybook** - For comprehensive documentation and guides
2. **Stories Storybook** - For component stories and interactive examples

## Quick Start

### MDX Documentation Storybook (Port 6006)
```bash
# Start the MDX docs Storybook
yarn start:docs

# Build the MDX docs Storybook
yarn build:docs
```

### Stories Storybook (Port 6007)
```bash
# Start the stories Storybook
yarn start:stories

# Build the stories Storybook
yarn build:stories
```

## Configuration Details

### MDX Documentation Storybook (`.storybook-docs/`)

**Purpose**: Comprehensive documentation, guides, and component API documentation

**Features**:
- Focuses on `.mdx` files
- Enhanced documentation settings
- Table of contents
- Source code display
- Component API tables

**File Patterns**:
- `src/**/*.mdx`
- `src/**/*.stories.mdx`
- `src/docs/**/*.mdx`

**Configuration**: `.storybook-docs/main.ts`

### Stories Storybook (`.storybook-stories/`)

**Purpose**: Interactive component stories and examples

**Features**:
- Standard Storybook stories
- Interactive controls
- Component testing
- Visual regression testing

**File Patterns**:
- `src/**/*.stories.@(js|jsx|ts|tsx)`
- Excludes `.stories.mdx` files

**Configuration**: `.storybook-stories/main.ts`

## File Organization

```
src/
├── docs/                    # MDX documentation files
│   ├── Button.mdx
│   ├── GettingStarted.mdx
│   └── ...
├── components/              # Component stories
│   ├── Button/
│   │   ├── Button.stories.tsx    # Stories 
│   │   └── Button.mdx            # Docs Documentation
│   └── ...
└── elements/
    ├── Buttons/
    │   ├── Button.stories.tsx    # Stories 
    │   └── Button.mdx            # Docs Documentation
    └── ...
```

## Writing Documentation

### MDX Documentation Files

Create `.mdx` files in the `src/docs/` directory or alongside your components:

```mdx
import { Meta, Story, Canvas, ArgsTable } from '@storybook/blocks';
import { Button } from '../elements/Buttons/Button';

<Meta title="Documentation/Button" component={Button} />

# Button Component

The Button component is a versatile, accessible button element.

## Props

<ArgsTable of={Button} />

## Examples

<Canvas>
  <Story name="Primary">
    <Button variant="primary">Click me</Button>
  </Story>
</Canvas>
```

### Story Files

Create `.stories.tsx` files for interactive examples:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

## Build Output

- **MDX Documentation**: `storybook-static-docs/`
- **Stories**: `storybook-static-stories/`

## Development Workflow

1. **For Documentation**: Use `yarn start:docs` to work on MDX files
2. **For Stories**: Use `yarn start:stories` to work on component stories
3. **For Both**: Run both instances simultaneously on different ports

## Customization

### Adding Addons

To add addons to a specific Storybook instance, edit the respective `main.ts` file:

```ts
// .storybook-docs/main.ts or .storybook-stories/main.ts
addons: [
  getAddonPath("@storybook/addon-links"),
  getAddonPath("@storybook/addon-essentials"),
  getAddonPath("@storybook/addon-interactions"),
  // Add your custom addon here
],
```

### Custom Preview Configuration

Each Storybook instance has its own preview configuration:
- MDX Docs: `.storybook-docs/preview.tsx`
- Stories: `.storybook-stories/preview.tsx`

## Troubleshooting

### Port Conflicts
If you encounter port conflicts, you can change the ports in the package.json scripts:

```json
{
  "scripts": {
    "start:docs": "storybook dev -p 6006 -c .storybook-docs",
    "start:stories": "storybook dev -p 6007 -c .storybook-stories"
  }
}
```

### File Not Found
Ensure your MDX files are in the correct directories and match the patterns defined in the respective `main.ts` configurations. 