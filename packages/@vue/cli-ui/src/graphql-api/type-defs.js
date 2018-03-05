module.exports = `

type ConsoleLog {
  id: ID!
  message: String!
  label: String
  tag: String
  type: ConsoleLogType!
}

enum ConsoleLogType {
  log
  warn
  error
  info
  done
}

enum PackageManager {
  npm
  yarn
}

type Folder {
  name: String!
  path: String!
  isPackage: Boolean
  isVueProject: Boolean
  favorite: Boolean
  children: [Folder]
}

type Project {
  id: ID!
  name: String!
  path: String!
  favorite: Int
  features: [Feature]
  plugins: [Plugin]
}

input ProjectCreateInput {
  path: String!
  force: Boolean!
  packageManager: PackageManager
}

input ProjectImportInput {
  path: String!
}

type Version {
  current: String!
  latest: String
}

type GitHubStats {
  stars: Int
}

type Plugin {
  id: ID!
  version: Version!
  official: Boolean
  installed: Boolean
  website: String
  description: String
  githubStats: GitHubStats
  prompts: [Prompt]
}

input PluginSearchInput {
  terms: String!
}

type Feature {
  id: ID!
  label: String!
  description: String!
  link: String!
  enabled: Boolean!
}

enum PromptType {
  input
  confirm
  list
  rawlist
  expand
  checkbox
  password
  editor
}

type PromptChoice {
  value: String!
}

type PromptError {
  message: String!
  link: String
}

type Prompt {
  id: ID!
  enabled: Boolean!
  type: PromptType!
  name: String
  message: String
  description: String
  link: String
  choices: [PromptChoice]
  currentValue: String
  error: PromptError
}

input PromptInput {
  id: ID!
  value: String!
}

type Preset {
  id: ID!
  name: String
  description: String
  features: [String]
}

type ProjectCreation {
  presets: [Preset]
}

type Query {
  cwd: String!
  folderCurrent: Folder
  foldersFavorite: [Folder]
  projects: [Project]
  projectCurrent: Project
  projectCreation: ProjectCreation
  pluginSearch (input: PluginSearchInput!): [Plugin]
}

type Mutation {
  folderOpen (path: String!): Folder
  folderOpenParent: Folder
  folderSetFavorite (path: String!, favorite: Boolean!): Folder
  projectCreate (input: ProjectCreateInput!): Project!
  projectImport (input: ProjectImportInput!): Project!
  projectOpen (id: ID!): Project!
  projectSetFavorite (id: ID!, favorite: Int!): Project!
  pluginAdd (id: ID!): Plugin
  promptAnswer (input: PromptInput!): Prompt
}

type Subscription {
  consoleLogAdded: ConsoleLog!
  cwdChanged: String!
}
`