module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.spec.ts"],
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
  };