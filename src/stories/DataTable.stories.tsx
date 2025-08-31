import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type Column } from "../components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Rohit", age: 20, email: "rohit@example.com" },
  { id: 2, name: "Amit", age: 21, email: "amit@example.com" },
  { id: 3, name: "Sara", age: 22, email: "sara@example.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  tags: ["autodocs"],
  argTypes: {
    onRowSelect: { action: "row selected" },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;


export const Default: Story = {
  args: {
    data: users,
    columns,
  },
};


export const Sortable: Story = {
  args: {
    data: users,
    columns,
  },
};


export const Selectable: Story = {
  args: {
    data: users,
    columns,
    selectable: true,
  },
};


export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};
