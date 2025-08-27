# Environment Variables Setup Guide

## 🔐 **Secure Configuration for TripleZero iT**

This guide explains how to properly set up your environment variables for secure operation.

## 📁 **File Structure**

```
triplezero-it/
├── .env.local          # Your actual credentials (NEVER commit this)
├── .env.example        # Example format (safe to commit)
├── .gitignore          # Should include .env.local
└── src/
    └── lib/
        └── supabase.ts # Uses environment variables
```

## ⚠️ **Critical Security Notes**

- **NEVER commit `.env.local` to version control**
- **NEVER hardcode credentials in your application code**
- **NEVER share your actual Supabase credentials publicly**
- **Use strong, unique passwords for admin accounts**

## 🔧 **Step 1: Create .env.local**

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🔍 **Step 2: Get Your Supabase Credentials**

1. **Go to your Supabase Dashboard**
2. **Select your project**
3. **Go to Settings > API**
4. **Copy the following values:**

   - **Project URL**: Copy the "Project URL" (starts with `https://`)
   - **Anon Key**: Copy the "anon public" key

## ✅ **Step 3: Verify Format**

**Correct Format:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhkmrsbbrwkcyfxbybji.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Common Mistakes to Avoid:**
```bash
# ❌ Wrong - has @ symbol
NEXT_PUBLIC_SUPABASE_URL=@https://dhkmrsbbrwkcyfxbybji.supabase.co

# ❌ Wrong - missing https://
NEXT_PUBLIC_SUPABASE_URL=dhkmrsbbrwkcyfxbybji.supabase.co

# ❌ Wrong - extra spaces
NEXT_PUBLIC_SUPABASE_URL= https://dhkmrsbbrwkcyfxbybji.supabase.co

# ❌ Wrong - quotes around values
NEXT_PUBLIC_SUPABASE_URL="https://dhkmrsbbrwkcyfxbybji.supabase.co"
```

## 🚫 **Step 4: Update .gitignore**

Ensure your `.gitignore` file includes:

```gitignore
# Environment variables
.env.local
.env.*.local

# Supabase
.supabase/
```

## 🔄 **Step 5: Restart Development Server**

After creating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## 🧪 **Step 6: Test Configuration**

1. **Check browser console** for any errors
2. **Visit `/login`** to test authentication
3. **Verify Supabase connection** works

## 🚨 **Troubleshooting**

### **"supabaseUrl is required" Error**

**Cause**: Environment variable not loaded or malformed

**Solutions**:
1. **Check file name**: Must be exactly `.env.local`
2. **Check file location**: Must be in project root
3. **Check format**: No extra characters or spaces
4. **Restart server**: Environment changes require restart

### **"Cannot read properties of undefined" Error**

**Cause**: Supabase client not properly initialized

**Solutions**:
1. **Verify environment variables** are set correctly
2. **Check for typos** in variable names
3. **Ensure no extra characters** in values

### **"Permission denied" Error**

**Cause**: Database access issues

**Solutions**:
1. **Check RLS policies** are enabled
2. **Verify user role** in database
3. **Check Supabase project** settings

## 🔒 **Security Best Practices**

### **Environment Variables**
- ✅ Use `.env.local` for local development
- ✅ Use `.env.example` for documentation
- ✅ Never commit actual credentials
- ✅ Use strong, unique passwords

### **Admin Accounts**
- ✅ Create admin users through Supabase dashboard
- ✅ Use email addresses you control
- ✅ Set strong passwords (12+ characters)
- ✅ Enable 2FA if available

### **Database Security**
- ✅ Enable Row Level Security (RLS)
- ✅ Use proper RLS policies
- ✅ Limit admin access to necessary users
- ✅ Regular security audits

## 📋 **Checklist**

- [ ] `.env.local` file created
- [ ] Supabase URL copied correctly (no @ symbol)
- [ ] Supabase anon key copied correctly
- [ ] `.gitignore` updated
- [ ] Development server restarted
- [ ] No errors in browser console
- [ ] Login page accessible
- [ ] Admin dashboard accessible

## 🆘 **Need Help?**

If you're still having issues:

1. **Double-check** all environment variable values
2. **Verify** no extra characters or spaces
3. **Restart** your development server
4. **Check** browser console for specific error messages
5. **Verify** Supabase project is active and accessible

---

**Remember: Security first! Never expose your credentials publicly.** 🔐
