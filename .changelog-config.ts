interface CommitType {
  emoji: string;
  section: string;
}

interface Types {
  [key: string]: CommitType;
}

interface Commit {
  type: string;
  scope: string;
  hash: string;
  shortHash?: string;
  references?: Array<{ issue: string }>;
}

const config = {
  writerOpts: {
    transform: (commit: Commit, context: any) => {
      const issues: string[] = [];

      commit.type = commit.type || '';
      commit.scope = commit.scope || '';

      // Transformar los tipos de commit a emojis y títulos en español
      const types: Types = {
        feat: {
          emoji: '✨',
          section: 'Nuevas Características',
        },
        fix: {
          emoji: '🐛',
          section: 'Correcciones',
        },
        docs: {
          emoji: '📚',
          section: 'Documentación',
        },
        style: {
          emoji: '💄',
          section: 'Estilos',
        },
        refactor: {
          emoji: '♻️',
          section: 'Refactorización',
        },
        perf: {
          emoji: '⚡',
          section: 'Rendimiento',
        },
        test: {
          emoji: '✅',
          section: 'Pruebas',
        },
        build: {
          emoji: '📦',
          section: 'Build',
        },
        ci: {
          emoji: '👷',
          section: 'CI',
        },
        chore: {
          emoji: '🔧',
          section: 'Mantenimiento',
        },
        backup: {
          emoji: '💾',
          section: 'Backup',
        },
      };

      if (types[commit.type]) {
        commit.type = `${types[commit.type].emoji} ${types[commit.type].section}`;
      } else {
        return false;
      }

      if (typeof commit.hash === 'string') {
        commit.shortHash = commit.hash.substring(0, 7);
      }

      // Agregar enlaces a issues si existen
      if (commit.references) {
        commit.references.forEach((reference) => {
          issues.push(reference.issue);
        });
      }

      return commit;
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
  },
};

export default config;
