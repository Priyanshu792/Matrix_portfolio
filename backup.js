const fs = require('fs');
const path = require('path');

class BackupManager {
    constructor() {
        this.versionFile = 'version.json';
        this.backupDir = 'backups';
    }

    loadVersionInfo() {
        try {
            const data = fs.readFileSync(this.versionFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading version info:', error);
            return null;
        }
    }

    createBackup() {
        const versionInfo = this.loadVersionInfo();
        if (!versionInfo) return;

        const currentVersion = versionInfo.currentVersion;
        const backupPath = path.join(this.backupDir, `v${currentVersion}`);

        try {
            // Create backup directory
            if (!fs.existsSync(backupPath)) {
                fs.mkdirSync(backupPath, { recursive: true });
            }

            // Copy files
            versionInfo.versionHistory[0].files.forEach(file => {
                fs.copyFileSync(file, path.join(backupPath, file));
            });

            // Create info.txt
            const infoContent = this.generateInfoContent(versionInfo);
            fs.writeFileSync(path.join(backupPath, 'info.txt'), infoContent);

            console.log(`Backup created successfully: v${currentVersion}`);
        } catch (error) {
            console.error('Error creating backup:', error);
        }
    }

    generateInfoContent(versionInfo) {
        return `Version: ${versionInfo.currentVersion}
Date: ${versionInfo.lastUpdated}
Author: Matrix Developer
Description: ${versionInfo.versionHistory[0].description}

Files included:
${versionInfo.versionHistory[0].files.map(file => `- ${file}`).join('\n')}

Changes:
- Matrix theme implementation
- Interactive terminal UI
- Project showcase system
- Animated sections`;
    }

    incrementVersion(type = 'patch') {
        const versionInfo = this.loadVersionInfo();
        if (!versionInfo) return;

        const [major, minor, patch] = versionInfo.currentVersion.split('.').map(Number);
        let newVersion;

        switch(type) {
            case 'major':
                newVersion = `${major + 1}.0.0`;
                break;
            case 'minor':
                newVersion = `${major}.${minor + 1}.0`;
                break;
            default:
                newVersion = `${major}.${minor}.${patch + 1}`;
        }

        versionInfo.currentVersion = newVersion;
        versionInfo.lastUpdated = new Date().toISOString().split('T')[0];
        versionInfo.versionHistory.unshift({
            version: newVersion,
            date: versionInfo.lastUpdated,
            description: `Update to version ${newVersion}`,
            files: versionInfo.versionHistory[0].files
        });

        fs.writeFileSync(this.versionFile, JSON.stringify(versionInfo, null, 4));
        console.log(`Version incremented to ${newVersion}`);
    }
}

// Usage example:
const backup = new BackupManager();
// backup.createBackup();
// backup.incrementVersion('minor');
