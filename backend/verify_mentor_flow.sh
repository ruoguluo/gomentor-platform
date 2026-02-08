#!/bin/bash
BASE_URL="http://localhost:3000/api"
EMAIL="testmentor_$(date +%s)@example.com"
PASSWORD="Password123!"

echo "1. Registering new mentor ($EMAIL)..."
REGISTER_RES=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\", \"firstName\":\"Test\", \"lastName\":\"Mentor\", \"roles\":[\"MENTOR\"]}")

# Simple extraction of token using grep/sed
TOKEN=$(echo $REGISTER_RES | sed -n 's/.*"accessToken":"\([^"]*\)".*/\1/p')

if [ -z "$TOKEN" ]; then
  echo "Registration failed: $REGISTER_RES"
  exit 1
fi
echo "Token received (len=${#TOKEN})"

echo "2. Updating profile..."
# Note: hourlyRate might be expected as number.
curl -s -X PUT $BASE_URL/mentors/me/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Senior Developer", "bio":"I am a mentor", "hourlyRate": 100, "skills": ["JavaScript", "Python"], "languages": ["English"]}'
echo ""

echo "3. Uploading resume..."
# Create a dummy PDF file
echo "Fake PDF content" > dummy_resume.pdf
curl -s -X POST $BASE_URL/mentors/me/resume \
  -H "Authorization: Bearer $TOKEN" \
  -F "resume=@dummy_resume.pdf"
echo ""

echo "4. Searching mentors..."
curl -s -X GET "$BASE_URL/mentors/search?query=Test"
echo ""

echo "5. Verifying public profile..."
# Search again to find ourself
SEARCH_RES=$(curl -s -X GET "$BASE_URL/mentors/search?query=Test")
# Extract the first ID found
ID=$(echo $SEARCH_RES | sed -n 's/.*"id":"\([^"]*\)".*/\1/p' | head -n 1)

if [ -n "$ID" ]; then
  echo "Found Mentor ID: $ID"
  curl -s -X GET "$BASE_URL/mentors/$ID"
else
  echo "Could not find mentor in search results."
fi
echo ""

# Cleanup
rm dummy_resume.pdf
echo "Done."
