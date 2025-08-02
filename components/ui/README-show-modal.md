# ShowModal Professional Component

A highly customizable and professional modal component built with React, TypeScript, and Tailwind CSS. This component provides a consistent and accessible modal experience across your application.

## Features

- ✅ **Multiple Types**: Success, Error, Warning, Info, and Default
- ✅ **Responsive Design**: Works perfectly on all screen sizes
- ✅ **Dark Mode Support**: Seamless dark/light theme integration
- ✅ **Keyboard Navigation**: ESC key to close
- ✅ **Accessibility**: ARIA attributes and focus management
- ✅ **Loading States**: Built-in loading spinner
- ✅ **Customizable**: Size, styling, and behavior options
- ✅ **TypeScript**: Full type safety
- ✅ **Animations**: Smooth transitions and effects

## Installation

The component is already available in your project at `components/ui/show-modal.tsx`.

## Basic Usage

```tsx
import ShowModal from '@/components/ui/show-modal'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ShowModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="My Modal"
    >
      <p>Your content here</p>
    </ShowModal>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility |
| `onClose` | `() => void` | - | Function called when modal closes |
| `title` | `string` | - | Modal title (optional) |
| `children` | `React.ReactNode` | - | Modal content |
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | Modal type with corresponding styling |
| `showCloseButton` | `boolean` | `true` | Show/hide close button |
| `closeOnOverlayClick` | `boolean` | `true` | Close modal when clicking backdrop |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `actions` | `React.ReactNode` | - | Action buttons (optional) |
| `className` | `string` | - | Additional CSS classes |

## Modal Types

### Success Modal
```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Success!"
  type="success"
>
  <p>Operation completed successfully!</p>
</ShowModal>
```

### Error Modal
```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Error"
  type="error"
>
  <p>Something went wrong. Please try again.</p>
</ShowModal>
```

### Warning Modal
```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Warning"
  type="warning"
>
  <p>This action cannot be undone.</p>
</ShowModal>
```

### Info Modal
```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Information"
  type="info"
>
  <p>Here's some important information.</p>
</ShowModal>
```

## Modal Sizes

### Small Modal
```tsx
<ShowModal size="sm" {...otherProps}>
  <p>Quick confirmation message</p>
</ShowModal>
```

### Large Modal
```tsx
<ShowModal size="lg" {...otherProps}>
  <div>Complex content with forms, tables, etc.</div>
</ShowModal>
```

### Full Width Modal
```tsx
<ShowModal size="full" {...otherProps}>
  <div>Maximum width content</div>
</ShowModal>
```

## Loading State

```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Processing..."
  loading={true}
  showCloseButton={false}
  closeOnOverlayClick={false}
>
  <p>Please wait while we process your request...</p>
</ShowModal>
```

## Custom Actions

```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirm Action"
  actions={
    <>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</ShowModal>
```

## Custom Styling

```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Custom Modal"
  className="border-2 border-purple-200 dark:border-purple-700"
>
  <p>Modal with custom styling</p>
</ShowModal>
```

## Advanced Examples

### Form Confirmation Modal
```tsx
<ShowModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Please confirm your information"
  type="info"
  size="lg"
  actions={
    <>
      <Button variant="outline" onClick={() => setShowModal(false)}>
        Edit
      </Button>
      <Button onClick={handleSubmit}>
        Confirm & Submit
      </Button>
    </>
  }
>
  <div className="space-y-4">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Please review the information below before submitting.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col space-y-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <span className="font-medium text-gray-900 dark:text-white capitalize">
            {key.replaceAll('-', ' ')}
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            {value as string || 'Not provided'}
          </span>
        </div>
      ))}
    </div>
  </div>
</ShowModal>
```

### No Close Button Modal
```tsx
<ShowModal
  isOpen={isOpen}
  onClose={onClose}
  title="Important Notice"
  showCloseButton={false}
  closeOnOverlayClick={false}
  actions={
    <Button onClick={onClose}>
      I Understand
    </Button>
  }
>
  <p>This modal requires user acknowledgment to proceed.</p>
</ShowModal>
```

## Accessibility Features

- **Keyboard Navigation**: ESC key closes the modal
- **Focus Management**: Focus is trapped within the modal
- **ARIA Attributes**: Proper accessibility labels
- **Screen Reader Support**: Semantic HTML structure
- **Body Scroll Lock**: Prevents background scrolling when modal is open

## Best Practices

1. **Always provide a close method**: Ensure users can always close the modal
2. **Use appropriate types**: Choose the right modal type for your use case
3. **Keep content concise**: Don't overload modals with too much content
4. **Provide clear actions**: Make action buttons descriptive and clear
5. **Handle loading states**: Use loading prop for async operations
6. **Test keyboard navigation**: Ensure all functionality works with keyboard

## Examples Page

See `components/ui/show-modal-examples.tsx` for comprehensive examples of all modal types and configurations.

## Integration with Existing Code

The component has been integrated into your register page (`components/auth/register/page.tsx`) to replace the existing modal implementation with a more professional and feature-rich solution. 