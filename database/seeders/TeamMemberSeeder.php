<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $teamMembers = [
            [
                'name' => 'John Smith',
                'position' => 'CEO & Founder',
                'bio' => 'John has over 15 years of experience in real estate investment and has personally acquired over 500 properties. He founded Fast Home Cash Offers with a mission to help homeowners sell their properties quickly and fairly.',
                'image_url' => '/images/team/john-smith.jpg',
                'email' => 'john@fasthomecashoffers.com',
                'phone' => '+1-555-0101',
                'linkedin_url' => 'https://linkedin.com/in/johnsmith',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Sarah Johnson',
                'position' => 'VP of Operations',
                'bio' => 'Sarah brings 12 years of operational excellence to our team. She ensures every transaction runs smoothly and our customers receive the best possible experience throughout the selling process.',
                'image_url' => '/images/team/sarah-johnson.jpg',
                'email' => 'sarah@fasthomecashoffers.com',
                'phone' => '+1-555-0102',
                'linkedin_url' => 'https://linkedin.com/in/sarahjohnson',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'Director of Acquisitions',
                'bio' => 'Michael leads our acquisition team with expertise in property valuation and market analysis. His keen eye for opportunities has helped us acquire properties in the best neighborhoods at fair prices.',
                'image_url' => '/images/team/michael-chen.jpg',
                'email' => 'michael@fasthomecashoffers.com',
                'phone' => '+1-555-0103',
                'linkedin_url' => 'https://linkedin.com/in/michaelchen',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Emily Rodriguez',
                'position' => 'Customer Relations Manager',
                'bio' => 'Emily is passionate about helping homeowners through difficult situations. She guides our customers through every step of the selling process with empathy, transparency, and professionalism.',
                'image_url' => '/images/team/emily-rodriguez.jpg',
                'email' => 'emily@fasthomecashoffers.com',
                'phone' => '+1-555-0104',
                'linkedin_url' => 'https://linkedin.com/in/emilyrodriguez',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'David Thompson',
                'position' => 'Construction Manager',
                'bio' => 'David oversees all renovation projects with 20 years of construction experience. He ensures every property we acquire is brought up to the highest standards before being sold to new families.',
                'image_url' => '/images/team/david-thompson.jpg',
                'email' => 'david@fasthomecashoffers.com',
                'phone' => '+1-555-0105',
                'linkedin_url' => 'https://linkedin.com/in/davidthompson',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Lisa Wang',
                'position' => 'Marketing Director',
                'bio' => 'Lisa drives our digital marketing efforts to connect with homeowners who need our services. Her data-driven approach ensures we reach the right people with the right message at the right time.',
                'image_url' => '/images/team/lisa-wang.jpg',
                'email' => 'lisa@fasthomecashoffers.com',
                'phone' => '+1-555-0106',
                'linkedin_url' => 'https://linkedin.com/in/lisawang',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($teamMembers as $member) {
            TeamMember::create($member);
        }
    }
}
