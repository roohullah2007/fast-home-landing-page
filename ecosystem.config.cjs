// PM2 configuration for Inertia SSR server
// Install PM2 globally: npm install -g pm2
// Start: pm2 start ecosystem.config.cjs
// Stop: pm2 stop inertia-ssr
// Restart: pm2 restart inertia-ssr
// View logs: pm2 logs inertia-ssr

module.exports = {
    apps: [{
        name: 'inertia-ssr',
        script: 'ssr-server.js',
        instances: 1,
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        max_memory_restart: '500M',
        env: {
            NODE_ENV: 'production',
            PORT: 13714
        },
        error_file: 'storage/logs/ssr-error.log',
        out_file: 'storage/logs/ssr-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,

        // Restart on file changes (useful for development)
        // watch: ['bootstrap/ssr'],
        // ignore_watch: ['node_modules', 'storage', 'public'],
    }]
};
