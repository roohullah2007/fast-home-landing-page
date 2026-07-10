<?php

namespace App\Console\Commands;

use App\Services\CacheService;
use Illuminate\Console\Command;

class CacheClear extends Command
{
    protected $signature = 'cache:clear-all {--warm-up : Warm up caches after clearing}';
    protected $description = 'Clear all application caches (config, route, view, cache)';

    public function handle(CacheService $cacheService): int
    {
        $this->info('🧹 Clearing all caches...');

        // Clear application cache
        $this->call('cache:clear');
        $this->line('✓ Application cache cleared');

        // Clear config cache
        $this->call('config:clear');
        $this->line('✓ Config cache cleared');

        // Clear route cache
        $this->call('route:clear');
        $this->line('✓ Route cache cleared');

        // Clear view cache
        $this->call('view:clear');
        $this->line('✓ View cache cleared');

        // Clear compiled classes
        $this->call('clear-compiled');
        $this->line('✓ Compiled classes cleared');

        $this->newLine();
        $this->info('✅ All caches cleared successfully!');

        // Warm up if requested
        if ($this->option('warm-up')) {
            $this->newLine();
            $this->call('cache:warm-up');
        }

        return Command::SUCCESS;
    }
}
