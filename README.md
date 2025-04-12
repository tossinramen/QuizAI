# QuizAI - AI-Powered Quiz Generator

QuizAI is an innovative web application that leverages artificial intelligence to generate customized quizzes. It provides an intuitive interface for creating, managing, and taking quizzes across various subjects and difficulty levels.

🌐 Live Demo: [quiz-ai-sable.vercel.app](https://quiz-ai-sable.vercel.app)

## ✨ Features

- AI-powered quiz generation
- Customizable quiz parameters
- User authentication and profile management
- Secure payment processing
- Responsive and modern UI
- Real-time quiz taking experience
- Performance analytics and insights

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- OpenAI API key
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quizai.git
cd quizai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

4. Initialize the database:
```bash
npm run db:push
# or
yarn db:push
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js
- **Authentication**: NextAuth.js
- **UI Components**: Shadcn UI
- **AI Integration**: OpenAI API
- **LLM Framework**: Langchain
- **Database ORM**: Drizzle
- **Database**: PostgreSQL
- **Database Hosting**: Supabase
- **Payments**: Stripe
- **Data Tables**: Tanstack Table
- **Type Safety**: TypeScript
- **Schema Validation**: Zod
- **Deployment**: Vercel

## 📚 Usage

1. **Create a Quiz**:
   - Log in to your account
   - Navigate to the quiz creation page
   - Select your desired topic and difficulty
   - Let AI generate questions for you
   - Customize and save your quiz

2. **Take a Quiz**:
   - Browse available quizzes
   - Select a quiz to take
   - Answer questions in real-time
   - Get immediate feedback and results

3. **Manage Quizzes**:
   - View your quiz history
   - Track performance metrics
   - Edit or delete existing quizzes

