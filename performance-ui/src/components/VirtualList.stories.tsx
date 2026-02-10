import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList } from './VirtualList';

const meta = {
  title: 'Performance/VirtualList',
  component: VirtualList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VirtualList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
