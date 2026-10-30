# Production image, for deployments only (DEPLOYMENT.md). Local development doesn't use Docker.
# One image serves every brand and every environment: config comes from runtime env vars.
#
#   docker build --build-arg APP_VERSION=0.1.0+sha.abc1234 --build-arg GIT_SHA=$(git rev-parse HEAD) .

ARG NODE_IMAGE=node:24.21.0-alpine

FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ARG APP_VERSION=0.0.0-unversioned
ARG GIT_SHA=unknown

COPY elfik ./
