/**
 * Returns a sensible default "build & run" snippet for a given stack label.
 * These are suggestions — users are expected to fill in/adjust them.
 */
export function defaultBuildCommands(stack: string): string {
  const s = stack.toLowerCase();

  if (s.includes("angular")) {
    return "npm install\nnpm start          # dev server\nng build           # production build";
  }
  if (s.includes("next.js")) {
    return "npm install\nnpm run dev        # dev server\nnpm run build      # production build";
  }
  if (s.includes("nuxt")) {
    return "npm install\nnpm run dev\nnpm run build";
  }
  if (s.includes("svelte")) {
    return "npm install\nnpm run dev\nnpm run build";
  }
  if (s.includes("vite")) {
    return "npm install\nnpm run dev\nnpm run build";
  }
  if (s.includes("remix")) {
    return "npm install\nnpm run dev\nnpm run build";
  }
  if (s.includes("node.js")) {
    return "npm install\nnpm start";
  }
  if (s.includes(".net")) {
    return "dotnet restore\ndotnet build\ndotnet run";
  }
  if (s.includes("go")) {
    return "go mod download\ngo run .\ngo build -o ./bin/app .";
  }
  if (s.includes("rust")) {
    return "cargo build\ncargo run";
  }
  if (s.includes("python")) {
    return "pip install -r requirements.txt\npython main.py";
  }
  if (s.includes("java") || s.includes("maven")) {
    return "mvn install\nmvn spring-boot:run";
  }
  if (s.includes("kotlin") || s.includes("gradle")) {
    return "./gradlew build\n./gradlew bootRun";
  }

  return "# TODO: add build and run commands";
}
