import type { Meta, StoryObj } from '@storybook/react';
import { RenderVisualizer } from './RenderVisualizer';

const meta = {
  title: 'Performance/RenderVisualizer',
  component: RenderVisualizer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RenderVisualizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
