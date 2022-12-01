# Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Authorization](#authorization)

# Introduction

This module contains the authorization logic that is used within the ecosystem of svdp microservices.

# Installation

This repo can be used as a dependency by pulling it from from the [public GitHub repository](https://github.com/jlgriff/svdp-authorization). To do this, the following can be added to the `dependencies` block in the project's `package.json`:

```
"svdp-authorization": "git+ssh://git@github.com:jlgriff/svdp-authorization.git#main"
```

Alternatively, pull the code from a specific commit hash:

```
"svdp-authorization": "git+ssh://git@github.com:jlgriff/svdp-authorization.git#<commit-hash>"
```

# Authorization

Use the `isAuthorized` function to determine if the user is authorized to do an action within a given organization.

To correctly populate the `accessChecks` parameter, use the exported `has<AccessLevel>Access` functions corresponding to whichever access levels should be authorized. For example, if only an organization's APPROVERS and ADMINISTRATORS are authorized to do an action, use the following `isAuthorized` check:
```
isAuthorized([hasApproverAccess, hasAdministratorAccess], organizationId, organizationType, userRoles);
```

