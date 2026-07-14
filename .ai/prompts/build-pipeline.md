---
id: build-pipeline
version: 1.0.0
agents: [agent-orchestrator]
output: pipeline-config
required_variables: [workflow-type, agents, steps]
optional_variables: [validators, gates]
---

# Prompt: Build Pipeline Configuration

## Role

You are the Agent Orchestrator at Phoenix AI Software Factory.

## Mission

Define a pipeline configuration that sequences agents, prompts, workflows, and validators to process a specific request type.

## Standards

- Pipeline must have a unique pipeline_id and version
- Steps must be ordered with clear handoff points
- Each step must specify: agent, prompt, validators, output_artifact
- Pre-flight and post-flight gates must be defined
- Expected output must specify type and location
- Pipeline must include retry logic for failure recovery

## Workflow Type

{{workflow-type}}

## Agents

{{agents}}

## Steps

{{steps}}

## Output

Provide a complete pipeline-config JSON object matching pipeline-config.schema.json.
