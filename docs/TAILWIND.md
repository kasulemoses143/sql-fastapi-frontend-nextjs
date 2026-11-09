# Tailwind styling from setup to usable components

## What Tailwind does

Tailwind turns the utility classes used in your source into the styles a browser needs. In TSX write className, not class. This course uses utility classes for spacing, color, typography, layout, responsive behavior and interactive states. You do not create custom selector rules.

The required app/globals.css file contains only `@import "tailwindcss";`. This loads Tailwind into the build. The root layout imports that entry once. Keeping the filename does not mean the course has switched back to custom CSS.

## Installation procedure

For the reference or a generated checkpoint, copy package.json, package-lock.json, postcss.config.mjs, tsconfig.json and next-env.d.ts; run npm ci inside frontend. Create the app files from Lesson 33. For a new Next.js scaffold choose TypeScript and Tailwind Yes.

If adding Tailwind manually to an existing Next.js app, run:

```sh
npm install -D tailwindcss @tailwindcss/postcss postcss
```

Create frontend/postcss.config.mjs with the complete configuration:

```javascript
export default {plugins: {'@tailwindcss/postcss': {}}};
```

This standard build configuration is a module for PostCSS; application components remain TypeScript. Create frontend/app/globals.css with only:

```css
@import "tailwindcss";
```

Ensure app/layout.tsx contains `import './globals.css';`. Restart npm run dev. For the supplied locked repository use npm ci rather than changing versions. See [official installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Read a class list by purpose

| Purpose | Examples | Meaning |
|---|---|---|
| Spacing | p-4 px-3 py-2 mt-1 mb-5 gap-5 | Padding, margin and gaps |
| Width | w-full max-w-xl max-w-5xl | Available width and maximum readable width |
| Layout | block flex flex-wrap grid | How elements are arranged |
| Surface | bg-white bg-slate-50 border border-slate-300 rounded-lg | Background, boundary and corners |
| Typography | text-sm text-3xl font-medium font-bold leading-relaxed | Size, weight and line spacing |
| Text color | text-slate-900 text-red-900 text-white | Readable foreground color |
| Responsive | sm:px-6 sm:p-6 sm:text-base | Apply utility from the named breakpoint upward |
| Interaction | hover:bg-sky-800 focus-visible:outline-2 | Hover/focus feedback |
| Disabled | disabled:opacity-50 disabled:cursor-wait | Communicate pending interaction |
| Overflow | overflow-x-auto | Scroll wide tables horizontally |

Start with unprefixed small-screen classes, then add breakpoint variants. sm: does not mean “only on small phones”; it applies at that breakpoint and larger. [Responsive design](https://tailwindcss.com/docs/responsive-design).

## Build a readable form

A label remains visible while the user types. Use a clear border, adequate padding and a focus style. The text input's type and required rules remain HTML/React behavior; Tailwind does not validate data.

```tsx
<label className="my-3 block max-w-xl font-medium text-slate-800">
  Full name
  <input
    name="full_name"
    required
    className="mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
  />
</label>
```

The form lessons add controlled state and a typed submit handler around this styling. Keep input readable on both keyboard and touch devices. Do not use placeholders as the only label.

## Buttons and pending states

A button needs a meaningful text label, a type appropriate to its form behavior and visible keyboard focus. Disable repeated submission while busy. Tailwind's disabled variant changes presentation; the disabled HTML property is what actually disables the button.

```tsx
<button type="submit" disabled={busy}
  className="rounded-md bg-sky-900 px-4 py-2 font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-wait disabled:opacity-50">
  {busy ? 'Saving…' : 'Save'}
</button>
```

This is a component fragment, not a complete file: busy is the boolean state supplied by the complete form component in the lesson. For a cancel button use type="button". [State variants](https://tailwindcss.com/docs/hover-focus-and-other-states).

## Tables and narrow screens

Wrap tables in a div with overflow-x-auto. Keep real table/caption/th semantics. Give header cells scope="col" and readable padding. Do not shrink text until the whole table becomes unreadable; let the table scroll in its container.

The reference app uses utility classes directly on its table, caption, headings and cells. Its layout uses a max-width content area with responsive horizontal padding. Test near 375px and on a wider screen; also test keyboard focus and long course titles.

## Keep class names detectable

Use complete class strings. `active ? 'bg-emerald-100' : 'bg-slate-100'` exposes both class names to the build scanner. Constructing `bg-${color}-100` from arbitrary data may produce no matching utility in the generated output. Prefer an explicit mapping of permitted variants.

The navigation's bracketed classes such as `[&_a]:py-2` apply utilities to descendant links. This is an optional Tailwind variant convenience; the same utilities can be written directly on each Link. Explain the simpler direct classes before discussing the shared variant syntax.

## Common failures

If all styling is missing, check the Tailwind packages, postcss.config.mjs, the single Tailwind entry import and the layout's import. Restart the dev server and inspect build errors. If only one class is missing, check spelling and whether it was constructed dynamically. If a heading looks like body text, add explicit text and weight utilities: Tailwind's base reset removes some browser defaults.

If a control cannot be used with a keyboard, adding color classes is not a fix. Check its semantic element, label, disabled state and event behavior. If a table overflows, inspect its wrapper. If an error is communicated only by red color, add meaningful text and role="alert".

## Practice and answer

Create a panel with a title, explanatory paragraph and two actions. Make padding larger at sm:, keep the base layout usable on a phone and give both actions visible focus. Explain every class. A valid solution uses a max-width wrapper, p-4 sm:p-6, a text-2xl font-bold title, and real buttons with distinct labels, adequate contrast and focus-visible utilities. There is no single required color palette; the required result is readable and usable behavior.

## Course build tool choice

The supplied scripts explicitly use Next.js with Webpack for both development and production builds. This is a supported Next.js option and keeps the checked Tailwind/PostCSS workflow consistent. The learner commands remain npm run dev and npm run build; do not replace them with a different bundler command while following the notes.
