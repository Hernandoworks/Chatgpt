"use client";

import { Badge, Button, Card, Input } from "ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-12 p-8">
      <header className="flex flex-col items-center gap-4 pt-16">
        <h1 className="text-4xl font-bold tracking-tight">Project Phoenix</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Enterprise monorepo — Next.js 16 + Tailwind CSS v4
        </p>
      </header>

      <section className="flex w-full flex-col gap-8">
        <Card>
          <h2 className="mb-4 text-xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">Inputs</h2>
          <div className="flex max-w-sm flex-col gap-4">
            <Input label="Default" placeholder="Enter text..." />
            <Input label="With Error" error="This field is required" />
            <Input label="Disabled" disabled value="Can't edit this" />
          </div>
        </Card>
      </section>
    </main>
  );
}
