import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import MapPicker from "react-google-map-picker";
import { getUser, getUserId } from "utils/session.server";
import { updateUser } from "utils/user.server";
import Button from "~/components/Button";
import LocationMarker from "~/icons/LocationMarker";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (!userID) {
    return redirect("/login");
  }

  return {};
}

export async function action({ request }) {
  const formData = await request.formData();

  const lat = formData.get("lat");
  const lng = formData.get("lng");

  const user = await getUser(request);

  if (user && lat && lng) {
    if (user?.lat !== lat || user?.lng !== lng) {
      const data = {
        ...(user?.lat !== lat ? { lat } : {}),
        ...(user?.lng !== lng ? { lng } : {}),
      };
      await updateUser({ request, data });
    }
    return redirect("cart/confirm-order");
  }

  return { error: "values missing" };
}

export default function SelectLocation() {
  const [status, setStatus] = useState(null);

  const [show, setShow] = useState(false);
  const DefaultZoom = 15;

  useEffect(() => {
    let timer = setTimeout(() => setShow(true), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [defaultLocation, setDefaultLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus(null);
        setDefaultLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setStatus(null);
        setDefaultLocation({
          lat: 25.3426116,
          lng: 74.6288301,
        });
        setLocation({
          lat: 25.3426116,
          lng: 74.6288301,
        });
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      getLocation();
    }
  }, []);

  return (
    <Form
      method="post"
      className="h-full flex flex-col items-stretch justify-between gap-2"
    >
      <div className="h-full bg-white rounded-xl ">
        {show && location ? (
          <>
            <input
              type="text"
              name="lat"
              value={location.lat}
              readOnly
              hidden
            />
            <input
              type="text"
              name="lng"
              value={location.lng}
              readOnly
              hidden
            />

            <MapPicker
              defaultLocation={defaultLocation}
              zoom={zoom}
              mapTypeId="roadmap"
              className="rounded-xl"
              style={{ height: "100%", width: "100%" }}
              onChangeLocation={handleChangeLocation}
              onChangeZoom={handleChangeZoom}
              apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
            />
            {status && <p>{status}</p>}
          </>
        ) : (
          <div className="w-full h-full bg-neutral-200 rounded-xl animate-pulse"></div>
        )}
      </div>

      <Button type="submit" theme="green">
        <LocationMarker />
        <span>Confirm location</span>
      </Button>
    </Form>
  );
}
