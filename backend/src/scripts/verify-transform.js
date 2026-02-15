
// Mock of the MentorController logic to verify the fix
const parseTags = (tags) => {
    if (!tags) return [];
    try {
        const parsed = JSON.parse(tags);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
};

const parseJson = (json) => {
    if (!json) return null;
    try {
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
};

const transformProfile = (profile) => {
    if (!profile) return null;
    return {
        ...profile,
        expertiseTags: parseTags(profile.expertiseTags),
        industryTags: parseTags(profile.industryTags),
        skillTags: parseTags(profile.skillTags),
        servicePatterns: parseTags(profile.servicePatterns),
        instantSettings: parseJson(profile.instantSettings),
    };
};

// Test Case
const dbRecord = {
    id: "mentor-123",
    expertiseTags: '["React", "Node.js"]',
    industryTags: '["Tech"]',
    skillTags: '["Coding"]',
    servicePatterns: '["instant", "scheduled"]', // JSON String
    instantSettings: '{"isOnlineNow": true, "rankBoost": true}', // JSON String
};

console.log("Original DB Record:", dbRecord);

const transformed = transformProfile(dbRecord);

console.log("Transformed Profile:", JSON.stringify(transformed, null, 2));

// Assertions
if (Array.isArray(transformed.servicePatterns) && transformed.servicePatterns.includes("instant")) {
    console.log("✅ servicePatterns parsed correctly");
} else {
    console.error("❌ servicePatterns parsing failed");
    process.exit(1);
}

if (transformed.instantSettings && transformed.instantSettings.isOnlineNow === true) {
    console.log("✅ instantSettings parsed correctly");
} else {
    console.error("❌ instantSettings parsing failed");
    process.exit(1);
}
