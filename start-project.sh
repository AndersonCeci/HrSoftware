cd frontend
echo "Starting frontend server..."
npm run dev &

cd ../backend
echo "Starting backend server..."
npm run start:dev &

wait