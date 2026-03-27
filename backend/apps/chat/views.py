from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer

class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()   # ✅ added queryset
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ChatRoom.objects.filter(user1=user) | ChatRoom.objects.filter(user2=user)

    @action(detail=False, methods=["post"], url_path="get_or_create")
    def get_or_create_chatroom(self, request):
        user = request.user
        other_user_id = request.data.get("other_user_id")

        if not other_user_id:
            return Response({"error": "other_user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        existing = ChatRoom.objects.filter(user1=user, user2_id=other_user_id) | ChatRoom.objects.filter(user2=user, user1_id=other_user_id)
        if existing.exists():
            room = existing.first()
        else:
            room = ChatRoom.objects.create(user1=user, user2_id=other_user_id)

        serializer = self.get_serializer(room)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()   # ✅ added queryset
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chatroom_id = self.request.query_params.get("chatroom")
        qs = Message.objects.all()
        if chatroom_id:
            qs = qs.filter(chatroom_id=chatroom_id)
        return qs.order_by("timestamp")

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)