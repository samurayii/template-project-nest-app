module.exports = {
    types: [
        {
            value: "build",
            name: "build:     Сборка проекта или изменения внешних зависимостей"
        },
        { 
            value: "ci", 
            name: "ci:        Настройка CI и работа со скриптами" 
        },
        { 
            value: "docs", 
            name: "docs:      Обновление документации" 
        },
        { 
            value: "feat", 
            name: "feat:      Добавление нового функционала" 
        },
        { 
            value: "dto", 
            name: "dto:       добавление/редактирование dto файлов" 
        },
        { 
            value: "fix", 
            name: "fix:       Исправление ошибок" 
        },
        {
            value: "perf",
            name: "perf:      Изменения направленные на улучшение производительности"
        },
        {
            value: "refactor",
            name: "refactor:  Правки кода без исправления ошибок или добавления новых функций"
        },
        { 
            value: "revert", 
            name: "revert:    Откат на предыдущие коммиты" 
        },
        {
            value: "style",
            name: "style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)"
        },
        { 
            value: "test", 
            name: "test:      Добавление тестов" 
        }
    ],
    messages: {
        type: "Какие изменения вы вносите?",
        scope: "\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):",
        customScope: "Укажите свою ОБЛАСТЬ:",
        subject: "Напишите КОРОТКОЕ описание:\n",
        body: "Напишите ПОДРОБНОЕ описание (опционально). Используйте \"|\" для новой строки:\n",
        confirmCommit: "Вас устраивает получившийся коммит?"
    },
    skipQuestions: ["footer", "breaking"],
    allowCustomScopes: true,
    subjectLimit: 72
};