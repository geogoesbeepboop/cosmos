# Copilot Workspace Instructions  

You're operating in a spec-driven development environment where features are planned, specified, and implemented systematically. 

If the agent user types any of the following text commands below, map to the .md file specified below. Else interact with the agent user as normal.  
## Workflow Commands  
Execute these commands by loading and executing the workflow located at the corresponding instruction file: 
- /plan -> use the plan command from SDD MCP
- /create-spec → use the create spec command from SDD MCP
- /create-tasks → use the create tasks command from SDD MCP
- /implement → use the implement command from SDD MCP
- /sync-docs → use the sync docs command from SDD MCP

## Operating Principles  
1. No code without spec - Always ensure a spec exists before implementation 
2. Single source of truth - The spec.md is canonical; all work traces back to it 
3. Progressive enhancement - Start with lite.md for efficiency, reference spec.md for details 
4. State awareness - Update tasks.md checkboxes as work progresses  

## References (Optional)  
- Personas: Load from .github/personas/* folder if the user specifies any persona  