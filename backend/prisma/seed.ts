import { PrismaClient, UserRole, SessionType, SessionStatus, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.sessionMessage.deleteMany();
  await prisma.session.deleteMany();
  await prisma.phaseObjective.deleteMany();
  await prisma.projectPhase.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.courseEnrollment.deleteMany();
  await prisma.courseSession.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.course.deleteMany();
  await prisma.question.deleteMany();
  await prisma.questionPlan.deleteMany();
  await prisma.menteeProfile.deleteMany();
  await prisma.education.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.business.deleteMany();
  await prisma.mentorAvailability.deleteMany();
  await prisma.mentorProfile.deleteMany();
  await prisma.personalityProfile.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.creditTransaction.deleteMany();
  await prisma.complianceLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleared existing data');

  const password = await bcrypt.hash('demo123', 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@gomentor.com',
      password,
      firstName: 'Admin',
      lastName: 'User',
      roles: [UserRole.ADMIN],
      primaryRole: UserRole.ADMIN,
      status: 'ACTIVE',
      profile: {
        create: {
          headline: 'Platform Administrator',
          bio: 'Managing the PhxNorth platform',
        },
      },
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create Sample Mentors
  const mentors = await Promise.all([
    prisma.user.create({
      data: {
        email: 'sarah.chen@gomentor.com',
        password,
        firstName: 'Sarah',
        lastName: 'Chen',
        roles: [UserRole.MENTOR],
        primaryRole: UserRole.MENTOR,
        status: 'ACTIVE',
        membershipTier: 'PAID',
        verificationStatus: 'APPROVED',
        profile: {
          create: {
            headline: 'Former VP Engineering at Google',
            bio: '15+ years in tech leadership. Passionate about helping engineers grow into leaders.',
            country: 'USA',
            city: 'San Francisco',
            timezone: 'America/Los_Angeles',
          },
        },
        personalityProfile: {
          create: {
            mbtiType: 'ENTJ',
            discType: 'D',
            strengths: ['Strategic Thinking', 'Leadership', 'Communication'],
            weaknesses: ['Impatience', 'Work-life balance'],
            leadershipStyle: 'Transformational',
            decisionMakingStyle: 'Analytical',
            communicationStyle: 'Direct',
          },
        },
        mentorProfile: {
          create: {
            yearsOfExperience: 15,
            currentCompany: 'Independent Consultant',
            currentTitle: 'Engineering Leadership Consultant',
            industry: 'Technology',
            instantRate: 150.00,
            scheduledRate: 200.00,
            isInstantAvailable: true,
            isVerified: true,
            expertiseTags: ['Engineering Leadership', 'Career Growth', 'System Design', 'Team Building', 'Google'],
            industryTags: ['Technology', 'Software Engineering', 'Leadership'],
            skillTags: ['Leadership', 'Mentoring', 'Architecture', 'Management'],
            totalSessions: 45,
            totalEarnings: 8500.00,
            averageRating: 4.8,
            education: {
              create: [
                { institution: 'Stanford University', degree: 'MS', fieldOfStudy: 'Computer Science', startYear: 2005, endYear: 2007 },
                { institution: 'MIT', degree: 'BS', fieldOfStudy: 'Computer Engineering', startYear: 2001, endYear: 2005 },
              ],
            },
            workExperience: {
              create: [
                { company: 'Google', title: 'VP of Engineering', startDate: new Date('2015-01-01'), endDate: new Date('2023-06-01'), isCurrent: false, description: 'Led engineering teams of 200+ engineers' },
                { company: 'Meta', title: 'Senior Engineering Manager', startDate: new Date('2010-03-01'), endDate: new Date('2014-12-01'), isCurrent: false },
                { company: 'Independent Consultant', title: 'Engineering Leadership Consultant', startDate: new Date('2023-07-01'), isCurrent: true },
              ],
            },
            availability: {
              create: [
                { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', timezone: 'America/Los_Angeles' },
                { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', timezone: 'America/Los_Angeles' },
                { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', timezone: 'America/Los_Angeles' },
                { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', timezone: 'America/Los_Angeles' },
                { dayOfWeek: 5, startTime: '09:00', endTime: '15:00', timezone: 'America/Los_Angeles' },
              ],
            },
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        email: 'marcus.johnson@gomentor.com',
        password,
        firstName: 'Marcus',
        lastName: 'Johnson',
        roles: [UserRole.MENTOR],
        primaryRole: UserRole.MENTOR,
        status: 'ACTIVE',
        membershipTier: 'PAID',
        verificationStatus: 'APPROVED',
        profile: {
          create: {
            headline: 'Startup Founder & Product Executive',
            bio: 'Founded 3 startups, 2 exits. Helping founders navigate the early stages.',
            country: 'USA',
            city: 'Austin',
            timezone: 'America/Chicago',
          },
        },
        personalityProfile: {
          create: {
            mbtiType: 'ENFP',
            discType: 'I',
            strengths: ['Creativity', 'Networking', 'Vision', 'Resilience'],
            weaknesses: ['Details', 'Follow-through'],
            leadershipStyle: 'Visionary',
            decisionMakingStyle: 'Intuitive',
            communicationStyle: 'Persuasive',
          },
        },
        mentorProfile: {
          create: {
            yearsOfExperience: 12,
            currentCompany: 'TechVentures Labs',
            currentTitle: 'CEO & Founder',
            industry: 'Technology',
            instantRate: 120.00,
            scheduledRate: 180.00,
            isInstantAvailable: false,
            isVerified: true,
            expertiseTags: ['Startup Funding', 'Product-Market Fit', 'Venture Capital', 'Pitch Decks', 'Growth Strategy'],
            industryTags: ['Startups', 'Venture Capital', 'Product Management'],
            skillTags: ['Fundraising', 'Product Strategy', 'Growth', 'Leadership'],
            totalSessions: 32,
            totalEarnings: 5600.00,
            averageRating: 4.9,
            education: {
              create: [
                { institution: 'Harvard Business School', degree: 'MBA', fieldOfStudy: 'Business Administration', startYear: 2008, endYear: 2010 },
                { institution: 'UC Berkeley', degree: 'BS', fieldOfStudy: 'Business Administration', startYear: 2004, endYear: 2008 },
              ],
            },
            workExperience: {
              create: [
                { company: 'TechVentures Labs', title: 'CEO & Founder', startDate: new Date('2020-01-01'), isCurrent: true, description: 'Building the next generation of productivity tools' },
                { company: 'DataFlow Inc', title: 'Co-Founder', startDate: new Date('2015-01-01'), endDate: new Date('2019-12-01'), isCurrent: false, description: 'Acquired for $50M in 2019' },
              ],
            },
            businesses: {
              create: [
                { name: 'TechVentures Labs', website: 'https://techventures.io', description: 'AI-powered productivity suite', startDate: new Date('2020-01-01'), stage: 'Growth', isActive: true },
                { name: 'DataFlow Inc', startDate: new Date('2015-01-01'), stage: 'Exited', isActive: false },
              ],
            },
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        email: 'elena.rodriguez@gomentor.com',
        password,
        firstName: 'Elena',
        lastName: 'Rodriguez',
        roles: [UserRole.MENTOR],
        primaryRole: UserRole.MENTOR,
        status: 'ACTIVE',
        membershipTier: 'PAID',
        verificationStatus: 'APPROVED',
        profile: {
          create: {
            headline: 'Staff Engineer at Netflix',
            bio: 'Specializing in distributed systems and backend architecture. Passionate about mentoring junior engineers.',
            country: 'USA',
            city: 'Los Gatos',
            timezone: 'America/Los_Angeles',
          },
        },
        personalityProfile: {
          create: {
            mbtiType: 'INTJ',
            discType: 'C',
            strengths: ['Technical Depth', 'System Design', 'Problem Solving', 'Mentoring'],
            weaknesses: ['Socializing', 'Small Talk'],
            leadershipStyle: 'Servant Leader',
            decisionMakingStyle: 'Analytical',
            communicationStyle: 'Precise',
          },
        },
        mentorProfile: {
          create: {
            yearsOfExperience: 10,
            currentCompany: 'Netflix',
            currentTitle: 'Staff Software Engineer',
            industry: 'Technology',
            instantRate: 100.00,
            scheduledRate: 150.00,
            isInstantAvailable: true,
            isVerified: true,
            expertiseTags: ['Distributed Systems', 'Backend Engineering', 'System Design', 'Java', 'Microservices'],
            industryTags: ['Technology', 'Streaming', 'Backend Engineering'],
            skillTags: ['Java', 'System Design', 'Architecture', 'Mentoring'],
            totalSessions: 67,
            totalEarnings: 9200.00,
            averageRating: 4.9,
            education: {
              create: [
                { institution: 'Carnegie Mellon University', degree: 'MS', fieldOfStudy: 'Computer Science', startYear: 2012, endYear: 2014 },
                { institution: 'University of Texas at Austin', degree: 'BS', fieldOfStudy: 'Computer Science', startYear: 2008, endYear: 2012 },
              ],
            },
            workExperience: {
              create: [
                { company: 'Netflix', title: 'Staff Software Engineer', startDate: new Date('2019-01-01'), isCurrent: true, description: 'Building scalable streaming infrastructure' },
                { company: 'Amazon', title: 'Senior Software Engineer', startDate: new Date('2016-01-01'), endDate: new Date('2018-12-01'), isCurrent: false },
                { company: 'Microsoft', title: 'Software Engineer', startDate: new Date('2014-06-01'), endDate: new Date('2015-12-01'), isCurrent: false },
              ],
            },
          },
        },
      },
    }),
  ]);
  console.log('✅ Created', mentors.length, 'mentors');

  // Create Sample Mentees
  const mentees = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alex.kim@gomentor.com',
        password,
        firstName: 'Alex',
        lastName: 'Kim',
        roles: [UserRole.MENTEE],
        primaryRole: UserRole.MENTEE,
        status: 'ACTIVE',
        membershipTier: 'FREE',
        profile: {
          create: {
            headline: 'Software Engineer seeking leadership growth',
            bio: '3 years at a startup, looking to transition into engineering management.',
            country: 'USA',
            city: 'San Francisco',
            timezone: 'America/Los_Angeles',
          },
        },
        personalityProfile: {
          create: {
            mbtiType: 'INFJ',
            discType: 'S',
            strengths: ['Empathy', 'Listening', 'Detail-oriented'],
            weaknesses: ['Assertiveness', 'Delegation'],
          },
        },
        menteeProfile: {
          create: {
            careerStage: 'Early Career',
            currentRole: 'Software Engineer',
            yearsExperience: 3,
            primaryGoals: ['Transition to Engineering Management', 'Improve Leadership Skills', 'Build Team'],
            interests: ['Leadership', 'Career Growth', 'Team Building'],
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        email: 'jordan.martinez@gomentor.com',
        password,
        firstName: 'Jordan',
        lastName: 'Martinez',
        roles: [UserRole.MENTEE],
        primaryRole: UserRole.MENTEE,
        status: 'ACTIVE',
        membershipTier: 'PAID',
        profile: {
          create: {
            headline: 'College Senior | CS Major | Seeking Career Advice',
            bio: 'Senior at UC Berkeley, graduating in May. Looking for guidance on breaking into big tech.',
            country: 'USA',
            city: 'Berkeley',
            timezone: 'America/Los_Angeles',
          },
        },
        personalityProfile: {
          create: {
            mbtiType: 'ENFJ',
            discType: 'I',
            strengths: ['Communication', 'Teamwork', 'Enthusiasm'],
            weaknesses: ['Experience', 'Confidence'],
          },
        },
        menteeProfile: {
          create: {
            careerStage: 'Student',
            currentRole: 'Computer Science Student',
            yearsExperience: 0,
            primaryGoals: ['Get into Big Tech', 'Ace Technical Interviews', 'Build Network'],
            interests: ['Software Engineering', 'Interviews', 'Career Planning'],
            questionPlans: {
              create: [
                {
                  topic: 'Big Tech Interview Preparation',
                  category: 'Career Development',
                  questions: {
                    create: [
                      { question: 'How should I prepare for system design interviews?', priority: 1 },
                      { question: 'What projects should I highlight on my resume?', priority: 2 },
                      { question: 'How do I negotiate my first salary?', priority: 3 },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        email: 'priya.sharma@gomentor.com',
        password,
        firstName: 'Priya',
        lastName: 'Sharma',
        roles: [UserRole.MENTEE],
        primaryRole: UserRole.MENTEE,
        status: 'ACTIVE',
        membershipTier: 'PAID',
        profile: {
          create: {
            headline: 'Backend Engineer | Want to learn System Design',
            bio: '5 years of backend development, now looking to deepen my system design skills.',
            country: 'USA',
            city: 'Seattle',
            timezone: 'America/Los_Angeles',
          },
        },
        personalityProfile: {
          create: {
            mbtiType: 'ISTJ',
            discType: 'C',
            strengths: ['Technical Skills', 'Reliability', 'Organization'],
            weaknesses: ['Big Picture Thinking', 'Communication'],
          },
        },
        menteeProfile: {
          create: {
            careerStage: 'Mid Career',
            currentRole: 'Senior Backend Engineer',
            yearsExperience: 5,
            primaryGoals: ['Master System Design', 'Become Staff Engineer', 'Architecture Skills'],
            interests: ['System Design', 'Distributed Systems', 'Career Advancement'],
          },
        },
      },
    }),
  ]);
  console.log('✅ Created', mentees.length, 'mentees');

  // Create a Sample Session
  const session = await prisma.session.create({
    data: {
      mentorId: mentors[0].id,
      menteeId: mentees[0].id,
      type: SessionType.SCHEDULED,
      status: SessionStatus.COMPLETED,
      scheduledAt: new Date('2026-02-01T10:00:00Z'),
      startedAt: new Date('2026-02-01T10:00:00Z'),
      endedAt: new Date('2026-02-01T11:00:00Z'),
      duration: 60,
      topic: 'Engineering Management Transition',
      description: 'Discussing transition from IC to management track',
      aiSummary: 'Alex and Sarah discussed the transition from individual contributor to engineering management. Key topics included: 1) When to make the switch, 2) Skills needed for management, 3) Managing former peers. Sarah recommended reading "The Manager\'s Path" and suggested Alex start by mentoring junior engineers.',
      aiNotes: {
        keyPoints: ['Timing of transition', 'Skill development', 'Peer management'],
        actionItems: ['Read The Manager\'s Path', 'Start mentoring 1-2 junior engineers', 'Shadow current manager in 1:1s'],
      },
      aiKeywords: ['engineering management', 'career transition', 'leadership', 'mentoring'],
      mentorFeedback: 'Alex has great potential for management. Very self-aware and asking the right questions.',
      menteeFeedback: 'Sarah was incredibly helpful. She gave me a clear roadmap for the next 6 months.',
      amount: 200.00,
      paymentStatus: 'PAID',
      mentorScoreEarned: 25,
      menteeScoreEarned: 10,
    },
  });
  console.log('✅ Created sample session');

  // Create a Sample Project
  const project = await prisma.project.create({
    data: {
      title: 'Leadership Development Program',
      description: '6-month program to develop engineering leadership skills',
      type: SessionType.SCHEDULED,
      status: ProjectStatus.ACTIVE,
      mainObjective: 'Transition from Senior Engineer to Engineering Manager within 12 months',
      theme: 'Career Transition',
      startDate: new Date('2026-02-01'),
      targetEndDate: new Date('2026-08-01'),
      overallProgress: 15,
      members: {
        create: [
          { userId: mentors[0].id, role: 'lead_mentor' },
          { userId: mentees[0].id, role: 'mentee' },
        ],
      },
      phases: {
        create: [
          {
            name: 'Discovery & Assessment',
            description: 'Assess current skills and identify gaps',
            order: 1,
            startDate: new Date('2026-02-01'),
            endDate: new Date('2026-02-28'),
            status: 'active',
            progress: 50,
            objectives: {
              create: [
                {
                  description: 'Complete leadership skills assessment',
                  kpis: ['Self-assessment completed', '360 feedback gathered'],
                  isCompleted: true,
                  completedAt: new Date('2026-02-05'),
                },
                {
                  description: 'Identify 3 key development areas',
                  kpis: ['Areas documented', 'Action plan created'],
                  isCompleted: false,
                },
              ],
            },
          },
          {
            name: 'Skill Building',
            description: 'Develop core management skills',
            order: 2,
            startDate: new Date('2026-03-01'),
            endDate: new Date('2026-05-31'),
            status: 'pending',
            progress: 0,
          },
          {
            name: 'Practice & Application',
            description: 'Apply skills in real scenarios',
            order: 3,
            startDate: new Date('2026-06-01'),
            endDate: new Date('2026-07-31'),
            status: 'pending',
            progress: 0,
          },
          {
            name: 'Review & Next Steps',
            description: 'Evaluate progress and plan next career move',
            order: 4,
            startDate: new Date('2026-08-01'),
            endDate: new Date('2026-08-15'),
            status: 'pending',
            progress: 0,
          },
        ],
      },
    },
  });
  console.log('✅ Created sample project');

  // Fetch mentors with their profiles
  const mentorsWithProfiles = await prisma.user.findMany({
    where: { roles: { has: UserRole.MENTOR } },
    include: { mentorProfile: true }
  });

  // Create Sample Courses
  const course = await prisma.course.create({
    data: {
      mentorId: mentorsWithProfiles[0].mentorProfile!.id,
      title: 'Engineering Leadership Fundamentals',
      description: 'A comprehensive course for engineers transitioning into leadership roles. Covers 1:1s, feedback, hiring, and building high-performing teams.',
      category: 'Leadership',
      level: 'intermediate',
      price: 499.00,
      pricingModel: 'per_course',
      isPublic: true,
      status: 'active',
      maxStudents: 20,
      totalStudents: 12,
      averageRating: 4.7,
      modules: {
        create: [
          {
            title: 'Module 1: The Mindset Shift',
            description: 'From IC to Manager: Understanding the fundamental changes',
            order: 1,
            duration: 120,
          },
          {
            title: 'Module 2: Effective 1:1s',
            description: 'How to have productive one-on-one meetings with your team',
            order: 2,
            duration: 90,
          },
          {
            title: 'Module 3: Giving Feedback',
            description: 'The art of constructive feedback and performance reviews',
            order: 3,
            duration: 120,
          },
        ],
      },
    },
  });
  console.log('✅ Created sample course');

  // Create some notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: mentees[0].id,
        type: 'SESSION_REMINDER',
        title: 'Upcoming Session',
        message: 'Your session with Sarah Chen starts in 15 minutes',
        actionUrl: '/sessions/123',
      },
      {
        userId: mentees[0].id,
        type: 'SYSTEM',
        title: 'Welcome to PhxNorth!',
        message: 'Complete your profile to get better mentor matches',
        actionUrl: '/profile',
      },
      {
        userId: mentors[0].id,
        type: 'SYSTEM',
        title: 'New Session Request',
        message: 'Alex Kim has requested a scheduled session',
        actionUrl: '/portal/mentor/sessions',
      },
    ],
  });
  console.log('✅ Created sample notifications');

  console.log('\n🎉 Database seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log('  - 1 Admin user');
  console.log('  - 3 Mentors (Sarah, Marcus, Elena)');
  console.log('  - 3 Mentees (Alex, Jordan, Priya)');
  console.log('  - 1 Completed Session');
  console.log('  - 1 Active Project with 4 phases');
  console.log('  - 1 Course with 3 modules');
  console.log('  - 3 Notifications');
  console.log('\n🔑 Demo Login Credentials:');
  console.log('  Admin: admin@gomentor.com / demo123');
  console.log('  Mentor: sarah.chen@gomentor.com / demo123');
  console.log('  Mentee: alex.kim@gomentor.com / demo123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
