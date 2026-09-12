import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir:'./tests', timeout:45000, fullyParallel:false, workers:1, reporter:[['list'],['html',{open:'never'}]], use:{baseURL:process.env.TEST_BASE_URL || 'http://localhost:3000',channel:'chrome',headless:true,screenshot:'only-on-failure',trace:'retain-on-failure'} });
