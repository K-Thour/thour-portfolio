---
title: 'Add Optional Contact Field to Contact Form'
type: 'feature'
created: '2026-06-28'
status: 'done'
route: 'one-shot'
---

# Add Optional Contact Field to Contact Form

## Intent

**Problem:** The contact form on the main portfolio website does not contain a field for contact number, which makes it harder for visitors to provide their phone number when initiating contact.

**Approach:** Add an optional "Contact Number" / "Comms Link" input field to the contact form, bound to form state, and submit it to the backend under the `mobileNumber` field inside the lead creation request.

## Suggested Review Order

**UI and State Binding**

- Add phone field to contact form state and clear it on successful submit
  [`ContactForm.tsx:14`](../../portfolio/src/app/components/contact/ContactForm.tsx#L14)

- Include mobileNumber in the payload when calling submitContactForm
  [`ContactForm.tsx:30`](../../portfolio/src/app/components/contact/ContactForm.tsx#L30)

- Add new input element styled to match theme variations for phone number
  [`ContactForm.tsx:120`](../../portfolio/src/app/components/contact/ContactForm.tsx#L120)
