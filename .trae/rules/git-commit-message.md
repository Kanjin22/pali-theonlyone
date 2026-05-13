---
alwaysApply: true
scene: git_message
---

# Commit Message Guidelines for Pali TheOnlyOne Project

## Format
Use conventional commits with a clear scope:

```
<type>(<scope>): <description>
```

## Type
- `feat`: New feature or content addition
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Code style/formatting (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Testing changes
- `chore`: Build/tooling updates
- `content`: Content updates (QA, knowledge data)

## Scope
Common scopes:
- `qa-grammar`: QA grammar content
- `knowledge`: Knowledge viewer/data
- `accessibility`: Accessibility improvements
- `ui`: UI/UX changes
- `server`: Server/API changes
- `style`: CSS styling
- `deploy`: Deployment related

## Description
- Use present tense
- Describe what changed and why
- Include issue references if applicable
- Use Thai language if appropriate for the project

## Examples
```
feat(content): add 2532 Q2-Q7 and 2533 Q1 to qa-grammar-1-2
fix(accessibility): add ARIA roles and button types to qa-grammar-1-2
style(ui): move back button to top-left in qa-grammar-1-2
refactor(vars): replace var with const in knowledge-data.js
```
