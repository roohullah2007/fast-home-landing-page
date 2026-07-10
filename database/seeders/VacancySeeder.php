<?php

namespace Database\Seeders;

use App\Models\Vacancy;
use Illuminate\Database\Seeder;

class VacancySeeder extends Seeder
{
    public function run(): void
    {
        $vacancies = [
            [
                'title' => 'Real Estate Acquisition Specialist',
                'department' => 'Acquisitions',
                'description' => 'We are seeking a motivated Real Estate Acquisition Specialist to join our growing team. You will be responsible for identifying, evaluating, and acquiring residential properties for our cash home buying business.',
                'requirements' => 'Bachelor\'s degree preferred
• 2+ years of real estate experience
• Strong analytical and negotiation skills
• Excellent communication abilities
• Knowledge of local real estate markets
• Valid driver\'s license',
                'responsibilities' => 'Analyze potential property acquisitions
• Conduct property evaluations and market research
• Negotiate purchase agreements with homeowners
• Build relationships with real estate agents and wholesalers
• Maintain accurate records and reporting
• Meet monthly acquisition targets',
                'location' => 'Local Market Area',
                'employment_type' => 'full-time',
                'salary_min' => 45000,
                'salary_max' => 65000,
                'experience_level' => 'mid',
                'is_active' => true,
                'podio_webhook_url' => 'https://podio.com/webhooks/your-candidates-app-webhook',
            ],
            [
                'title' => 'Marketing Coordinator',
                'department' => 'Marketing',
                'description' => 'Join our marketing team to help grow our home buying business through digital marketing, lead generation campaigns, and brand management.',
                'requirements' => 'Bachelor\'s degree in Marketing or related field
• 1-3 years of digital marketing experience
• Experience with Google Ads and Facebook Ads
• Knowledge of SEO and content marketing
• Proficiency in marketing analytics tools
• Creative and detail-oriented',
                'responsibilities' => 'Manage Google Ads and social media campaigns
• Create marketing content and materials
• Analyze campaign performance and ROI
• Coordinate with design and sales teams
• Maintain brand consistency across channels
• Generate monthly marketing reports',
                'location' => 'Remote/Hybrid',
                'employment_type' => 'full-time',
                'salary_min' => 40000,
                'salary_max' => 55000,
                'experience_level' => 'entry',
                'is_active' => true,
                'podio_webhook_url' => 'https://podio.com/webhooks/your-candidates-app-webhook',
            ],
            [
                'title' => 'Construction Project Manager',
                'department' => 'Operations',
                'description' => 'We need an experienced Construction Project Manager to oversee renovation projects on our acquired properties. You\'ll manage contractors, timelines, and budgets to ensure quality results.',
                'requirements' => 'Bachelor\'s degree in Construction Management or related field
• 5+ years of construction project management experience
• Knowledge of residential construction and renovation
• Strong organizational and leadership skills
• Experience with project management software
• Valid contractor\'s license preferred',
                'responsibilities' => 'Oversee residential renovation projects
• Manage contractor relationships and schedules
• Monitor project budgets and timelines
• Ensure quality control and safety compliance
• Coordinate with acquisition and sales teams
• Maintain project documentation and reporting',
                'location' => 'Local Market Area',
                'employment_type' => 'full-time',
                'salary_min' => 60000,
                'salary_max' => 80000,
                'experience_level' => 'senior',
                'is_active' => true,
                'podio_webhook_url' => 'https://podio.com/webhooks/your-candidates-app-webhook',
            ],
            [
                'title' => 'Administrative Assistant',
                'department' => 'Administration',
                'description' => 'Support our growing team with administrative tasks, customer service, and office management. This is a great entry-level opportunity in the real estate investment industry.',
                'requirements' => 'High school diploma required, college degree preferred
• 1+ years of administrative or customer service experience
• Excellent phone and communication skills
• Proficiency in Microsoft Office Suite
• Strong organizational abilities
• Professional and friendly demeanor',
                'responsibilities' => 'Answer phones and respond to customer inquiries
• Schedule appointments and manage calendars
• Maintain filing systems and databases
• Assist with marketing and administrative tasks
• Support team members as needed
• Provide excellent customer service',
                'location' => 'Office-based',
                'employment_type' => 'full-time',
                'salary_min' => 30000,
                'salary_max' => 40000,
                'experience_level' => 'entry',
                'is_active' => true,
                'podio_webhook_url' => 'https://podio.com/webhooks/your-candidates-app-webhook',
            ],
        ];

        foreach ($vacancies as $vacancy) {
            Vacancy::create($vacancy);
        }
    }
}
