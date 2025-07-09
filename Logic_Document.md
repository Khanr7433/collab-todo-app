---

## ✅ Logic_Document.md

```md
# Logic Document

## Smart Assign

When a user clicks the "Smart Assign" button on a task:

1. The server queries all users.
2. Counts how many active (non-Done) tasks each user has.
3. Selects the user with the fewest active tasks.
4. Assigns the task to that user.

## Conflict Handling

Each task includes an `updatedAt` timestamp.

- When two users edit the same task at once:
  - The first save succeeds.
  - The second save triggers a 409 Conflict response.
- The UI displays both the user's version and the server version.
- The user can choose to overwrite or cancel.
```
