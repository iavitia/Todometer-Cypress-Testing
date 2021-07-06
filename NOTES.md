Ensure that notifications are enabled for Chrome:
  - Windows 10:
  1. Go to settings
  2. Navigate to Notifications & actions
  3. Scroll down and ensure that Chrome is enabled

  - OSX
  1. No idea.


Upon Next Day or Upon Reset Click:

1. Paused items will move to Pending
2. Completed items will be removed
3. Pending items will remain unchanged

Every 30 Minutes
1. If there are Pending or Paused items: show a notification

Test Cases

1. Adds todos
  - Does not add empty todos (basic validation)
2. Deletes todos
3. Pauses todos
4. Completes todos
5. Reset works as outlined above
6. 30-minute reminder notifications
7. Next day notifications
8. Date and time display correctly
9. Progress bar widths are correct



NOTES:
1. Talk about the ESLINT config
2. Talk about using 'npx' for running the tests
3. Reasons I love Cypress:
  1. It's super easy to write custom commands
  2. It makes testing easy, intuitive, and even somewhat fun.
  3. 