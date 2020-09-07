- [Desclr](#desclr)
  - [Successes](#successes)
  - [Focus](#focus)
  - [Errors](#errors)

# Desclr

A habit tracking app

## Successes

- Trends
- Timer
- Authentication and users

## Focus

1. Focus is on the trends screen. Make sure habit trends work
2. Add more trends
3. Make sure to **clean up the store**
4. Check for bugs
5. Test in the real world

## Errors

- [x] The trends screen is **Not Fully Functional** because habits that do not include a timer won't work in the minutes passed section in the trends screen. This needs to be fixed for habits that don't have a timer to not include the minutes passed section in the trends screen.
- [x] Database does not record empty array of minutes passed in the trends key in the habit interface. This causes _undefined_ to break the app
