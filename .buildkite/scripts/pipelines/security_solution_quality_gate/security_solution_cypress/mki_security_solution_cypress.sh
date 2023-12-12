#!/bin/bash

set -euo pipefail

if [ -z "$1" ]
  then
    echo "No target script from the package.json file, is supplied"
    exit 1
fi

source .buildkite/scripts/common/util.sh
source .buildkite/scripts/steps/functional/common_cypress.sh
.buildkite/scripts/bootstrap.sh

export JOB=kibana-security-solution-chrome

buildkite-agent meta-data set "${BUILDKITE_JOB_ID}_is_test_execution_step" "true"

cd x-pack/test/security_solution_cypress
set +e

QA_API_KEY=$(vault_get security-solution-quality-gate qa_api_key)
BK_ANALYTICS_API_KEY=$(retry 5 5 vault read -field=serverless-sec-sol-cypress-bk-api-key secret/kibana-issues/dev/security-solution-quality-gate)

BK_ANALYTICS_API_KEY=$BK_ANALYTICS_API_KEY CLOUD_QA_API_KEY=$QA_API_KEY yarn $1; status=$?; yarn junit:merge || :; exit $status
