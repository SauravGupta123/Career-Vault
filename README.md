# Career Vault: Full Stack AI Career Coach 🚀

Career Vault is a full-stack, AI-powered career development platform designed to help professionals accelerate their career growth. It keeps users updated on current industry trends, highlighting the most in-demand tools and technologies, industry growth rates, and key skills needed to establish a career in a particular field.

To ensure effective learning, the platform features an AI-driven chatbot that guides users through their skill development journey, providing a structured learning path along with relevant resources.

Based on a user's information—such as their area of expertise, industry, and specialization—the platform helps them build an ATS-friendly resume and generate tailored cover letters based on job descriptions and other details. Similarly, users can prepare for mock interviews through dynamically changing quiz questions that reflect the latest industry challenges. They can track their progress in the quiz section, review past scores, and access explanations for questions when needed.

---

## Key Features

### 🌟 **AI-Powered Career Tools**
- **Resume Builder**: Generate ATS-optimized resumes with AI assistance.
- **Cover Letter Generator**: Create compelling, job-specific cover letters.
- **Mock Interview Preparation**: Practice with role-specific questions and get instant feedback.

### 📊 **Industry Insights**
- Stay ahead with real-time industry trends, salary data, and market analysis.
- Weekly updates powered by advanced AI analysis.

### 🛠️ **Personalized Guidance**
- Tailored recommendations based on your industry, experience, and skills.
- AI-generated improvement tips for interview preparation.

### 🔒 **Secure and Reliable**
- Built with Clerk for secure authentication.
- All data is encrypted and securely stored.

---

## Tech Stack

### **Frontend**
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn UI**: Pre-built UI components for a consistent design.

### **Backend**
- **Neon DB**: Serverless PostgreSQL database for scalable data storage.
- **Prisma**: ORM for database management and queries.
- **Inngest**: Event-driven workflows for generating insights and automating tasks.

### **AI Integration**
- **Google Generative AI**: Used for generating industry insights, resumes, and cover letters.

### **Payments And Authentication**
- **Stripe**: Secure payment processing for purchasing credits.
- **Clerk**: for creating the user from google and github.

---

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-career-coach.git
cd ai-career-coach
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your_database_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=your_google_generative_ai_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Generate Prisma Client
Run the following command to generate the Prisma client:
```bash
npx prisma generate
```

### 5. Run Database Migrations
Apply the database migrations:
```bash
npx prisma migrate dev
```

### 6. Start the Development Server
Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Usage

1. **Sign Up**: Create an account and complete the onboarding process.
2. **Buy Credits**: Purchase credits to access premium features.
3. **Explore Tools**:
   - Build resumes, generate cover letters, and prepare for interviews.
4. **Track Progress**: Monitor your performance and receive AI-generated insights.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the platform.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or support, please reach out to [your-email@example.com](mailto:your-email@example.com).
