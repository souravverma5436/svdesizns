# MongoDB Connection Fix Guide

## Problem
Your MongoDB connection is failing with DNS resolution errors.

**Error:** `querySrv ECONNREFUSED _mongodb._tcp.cluster0.rxdpxpf.mongodb.net`

This means your network is blocking MongoDB's DNS SRV lookups.

## Your Current IP Address
**49.156.94.116**

## Quick Fix Options

### Option 1: Fix Network Access in MongoDB Atlas (REQUIRED)

Even if DNS works, you MUST whitelist your IP:

1. Go to: https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar, under Security)
3. Click **"+ ADD IP ADDRESS"**
4. Choose one:
   - **"ADD CURRENT IP ADDRESS"** → Auto-detects your IP (49.156.94.116)
   - **"ALLOW ACCESS FROM ANYWHERE"** → Adds 0.0.0.0/0 (less secure, easier for dev)
5. Click **"Confirm"**
6. Wait 1-2 minutes for changes to apply

### Option 2: Fix DNS Resolution

Your network is blocking MongoDB DNS lookups. Try these:

**A. Change DNS Servers (Recommended)**

1. Open Windows Settings → Network & Internet → Change adapter options
2. Right-click your network connection → Properties
3. Select "Internet Protocol Version 4 (TCP/IPv4)" → Properties
4. Select "Use the following DNS server addresses"
5. Enter:
   - Preferred DNS: `8.8.8.8` (Google)
   - Alternate DNS: `1.1.1.1` (Cloudflare)
6. Click OK and restart your network connection

**B. Use Direct Connection (Bypass DNS)**

If changing DNS doesn't work, use direct connection:

1. Backup your current .env:
   ```bash
   copy server\.env server\.env.backup
   ```

2. Replace with direct connection:
   ```bash
   copy server\.env.direct server\.env
   ```

3. Restart the server

**C. Try Different Network**

- Use mobile hotspot
- Try a VPN
- Use a different WiFi network

### Option 3: Check Firewall

Windows Firewall might be blocking MongoDB:

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find "Node.js" and make sure both Private and Public are checked
4. If not listed, click "Allow another app" and add Node.js

## Test Your Connection

After trying the fixes above, test the connection:

```bash
cd server
node test-mongodb-connection.js
```

**Success looks like:**
```
✅ MongoDB Connected Successfully!
✅ Collections found: X
✅ All tests passed!
```

**If it still fails:**
- Check the error message
- Try the next option above

## Restart Your Server

Once the test passes:

```bash
cd server
node index.js
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

## Additional Checks

### 1. Check if Cluster is Paused

1. Go to MongoDB Atlas → Database → Clusters
2. If it shows "PAUSED", click **"Resume"**
3. Wait 1-2 minutes for it to start

### 2. Verify Database User

1. Go to MongoDB Atlas → Database Access
2. Make sure user `portfoliouser` exists
3. Check it has "Read and write to any database" permission
4. Password should be: `portfolio123`

### 3. Check Cluster Status

1. Make sure your cluster is in "RUNNING" state
2. Free tier clusters auto-pause after 60 days of inactivity

## Current Connection Strings

**SRV Format (Default):**
```
mongodb+srv://portfoliouser:portfolio123@cluster0.rxdpxpf.mongodb.net/sourav-portfolio
```

**Direct Format (Backup in .env.direct):**
```
mongodb://portfoliouser:portfolio123@ac-9t2zvzk-shard-00-00.rxdpxpf.mongodb.net:27017,...
```

## Most Common Issues

1. ❌ **IP not whitelisted** → Add your IP in Network Access
2. ❌ **DNS blocked** → Change DNS servers or use direct connection
3. ❌ **Cluster paused** → Resume the cluster
4. ❌ **Firewall blocking** → Allow Node.js through firewall
5. ❌ **Corporate network** → Use VPN or mobile hotspot

## Need Help?

If still not working:
1. Share screenshot of MongoDB Atlas Network Access page
2. Share output of `node test-mongodb-connection.js`
3. Tell me what network you're on (home/office/school)
4. Let me know if you can access MongoDB Atlas website
