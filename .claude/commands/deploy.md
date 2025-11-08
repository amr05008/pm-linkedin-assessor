---
description: Deploy changes to production with git commit and push
---

# Deploy to Production

Execute the following deployment workflow:

1. **Check Status**
   - Run `git status` to see all changes
   - Run `git diff` to review all modifications

2. **Summarize Changes**
   - Analyze all changes since the last commit
   - Create a clear, concise summary of what was added, modified, or fixed
   - List the key features, bug fixes, or improvements

3. **Commit Changes**
   - Stage all relevant files with `git add`
   - Create a well-formatted commit message that:
     - Starts with a verb (feat:, fix:, chore:, etc.)
     - Includes the summary of changes
     - Ends with the standard footer:
       ```
       🤖 Generated with [Claude Code](https://claude.com/claude-code)

       Co-Authored-By: Claude <noreply@anthropic.com>
       ```

4. **Push to Production**
   - Push to the main branch with `git push origin main`
   - Confirm the push was successful

5. **Provide Summary**
   - Show the commit SHA and message
   - Confirm deployment is complete
   - Note that Vercel will auto-deploy if connected

IMPORTANT:
- Do NOT commit files with secrets (.env, .env.local)
- Do review the git diff before committing
- Use proper commit message conventions
- Ask for confirmation if there are any concerns
