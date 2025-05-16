

# Nuxt Cursor Rules 🎯

A comprehensive ruleset for maintaining consistent and standardized code development in Nuxt.js based projects.

## 🎯 Purpose

- Establish team-wide coding standards
- Enable quick onboarding of new developers
- Minimize technical debt
- Reduce maintenance costs
- Streamline code review processes

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mustafa-kahraman/nuxt-cursor-rules.git

# Navigate to project directory
cd nuxt-cursor-rules
```

## 🚀 Usage

1. Find the rule set you need in the rules/ directory
2. Read the rule carefully and follow the checklist
3. Develop using the example codes as reference
4. Check the next steps section and complete required tasks
5. Write tests according to the test checklist

## 📚 Rule Set Structure

Each rule file follows the [rule-template.mdc](./rule-template.mdc) format and contains these sections:

```markdown
# [Topic] Rules

## 🎯 Purpose
[Rule purpose]

## 📦 Dependencies
- Required packages
- Related rules

## ✅ Correct Usage
[Examples]

## ❌ Incorrect Usage
[Anti-patterns]

## 🔍 Checklist
[Controls]

## 📚 Examples
[Code examples]

## 🔄 Next Steps
[Required tasks]

## 🧪 Test Checklist
[Test requirements]

## 💡 Tips and Recommendations
[Suggestions]
```

## 📂 Directory Structure

```
nuxt-cursor-rules/
├── rules/                # Rule files by category
│   ├── api/             # API rules
│   ├── database/        # Database rules
│   ├── types/           # TypeScript types & interfaces
│   ├── validation/      # Data validation rules (e.g., Zod)
│   ├── ui/              # UI component rules (e.g., Form validation)
│   ├── security/
│   ├── testing/
│   └── README.md        # Overview of all rule categories
├── scripts/             # Helper scripts
└── rule-template.mdc    # Rule template
└── README.md            # Main project README
```

## 🔍 Available Rules

Tüm kural kategorileri ve spesifik kurallar hakkında detaylı bilgi için lütfen ana kural dökümantasyonuna bakın:

**➡️ [Kural Kategorileri ve Detayları](./rules/README.md)**

Bu döküman, aşağıdaki gibi kategoriler altında toplanmış kurallara bağlantılar içerir:
- API
- Database
- Types
- Validation
- UI
- Security
- Testing

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-rule`)
3. Commit your changes (`git commit -m 'New rule: Authentication'`)
4. Push to the branch (`git push origin feature/amazing-rule`)
5. Create a Pull Request

## 📝 Adding New Rules

1. Reference the [rule-template.mdc](./rule-template.mdc) file
2. Create a new .mdc file in the appropriate directory
3. Write your rule following the template
4. Add example codes and test scenarios
5. Add a reference to your rule in README.md

## 📜 License

MIT

## 🤝 Contributors

- [Mustafa Kahraman](https://github.com/mustafa-kahraman) 