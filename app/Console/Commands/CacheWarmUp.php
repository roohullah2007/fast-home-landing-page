<?php

namespace App\Console\Commands;

use App\Services\CacheService;
use Illuminate\Console\Command;

class CacheWarmUp extends Command
{
    protected $signature = 'cache:warm-up';
    protected $description = 'Warm up application caches with critical data';

    public function handle(CacheService $cacheService): int
    {
        $this->info('🔥 Warming up application caches...');

        $startTime = microtime(true);

        try {
            $cacheService->warmUp();

            $duration = round(microtime(true) - $startTime, 2);

            $this->info("✅ Cache warm-up completed in {$duration}s");
            $this->newLine();

            $stats = $cacheService->getStats();
            $this->table(
                ['Setting', 'Value'],
                [
                    ['Cache Driver', $stats['driver']],
                    ['Cache Store', $stats['store']],
                    ['Cache Prefix', $stats['prefix'] ?: 'none'],
                ]
            );

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('❌ Cache warm-up failed: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
