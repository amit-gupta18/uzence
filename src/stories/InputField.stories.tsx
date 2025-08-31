import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField"; // adjust path if needed

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"], // 👈 this enables auto docs in v9
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "Helper text",
    size: "md",
    variant: "outlined",
    theme: "light",
  },
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const Filled: Story = { args: { variant: "filled" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };

export const Disabled: Story = { args: { disabled: true, value: "Disabled input" } };
export const Invalid: Story = {
  args: { invalid: true, errorMessage: "This field is required" },
};
export const Loading: Story = { args: { loading: true, value: "Loading..." } };

export const Password: Story = {
  args: { type: "password", label: "Password", placeholder: "Enter password" },
};

export const WithClearButton: Story = { args: { showClearButton: true, value: "Clear me" } };

export const DarkTheme: Story = {
  args: {
    theme: "dark",
    label: "Dark Mode Input",
    placeholder: "Enter text",
    helperText: "Supports dark mode",
  },
};
