import type { Meta, StoryObj } from '@storybook/react';
import { MemoizationLab } from './MemoizationLab';

const meta = {
  title: 'Performance/MemoizationLab',
  component: MemoizationLab,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MemoizationLab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
