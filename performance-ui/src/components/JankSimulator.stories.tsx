import type { Meta, StoryObj } from '@storybook/react';
import { JankSimulator } from './JankSimulator';

const meta = {
  title: 'Performance/JankSimulator',
  component: JankSimulator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof JankSimulator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
