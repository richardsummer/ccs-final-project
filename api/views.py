from hottakes.serializers import HottakeSerializer
from rest_framework import generics
from django.views.generic.edit import DeleteView
from hottakes.models import Hottake

from rest_framework.response import Response
from rest_framework.decorators import api_view
import spotipy
import spotipy.oauth2 as oauth2

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
import os

AUTH_URL = 'https://accounts.spotify.com/api/token'

# @api_view(('GET',))
# def request_spotify_token(request):
#     auth_response = requests.post(AUTH_URL, {
#         'grant_type': 'client_credentials',
#         'client_id': os.environ['SPOTIFY_CLIENT_ID'],
#         'client_secret': os.environ['SPOTIFY_CLIENT_SECRET'],
#     })
#     auth_response_data = auth_response.json()
#     access_token = auth_response_data['access_token']
#     headers = {
#         'Authorization': 'Bearer {token}'.format(token=access_token)
#     }
#
#     return Response(access_token)

# @api_view(('GET',))
# def spotify_show_details(request):
#     credentials = oauth2.SpotifyClientCredentials(
#             client_id=os.environ['SPOTIFY_CLIENT_ID'],
#             client_secret=os.environ['SPOTIFY_CLIENT_SECRET'],
#             )
#     token = credentials.get_access_token()
#     spotify = spotipy.Spotify(auth=token)
#     show = spotify.shows(['6Verqcb4xk7hVvEM2XCjkv'], market="US")
#
#     return Response(show)

@api_view(('GET',))
def spotify_show_episodes(request):
    credentials = oauth2.SpotifyClientCredentials(
            client_id=os.environ['SPOTIFY_CLIENT_ID'],
            client_secret=os.environ['SPOTIFY_CLIENT_SECRET'],
            )
    token = credentials.get_access_token()
    spotify = spotipy.Spotify(auth=token)
    show_episodes = spotify.show_episodes('6Verqcb4xk7hVvEM2XCjkv', market="US")

    return Response(show_episodes)
